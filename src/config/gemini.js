import {
   GoogleGenerativeAI,
   HarmCategory,
   HarmBlockThreshold,
 } from "@google/generative-ai";
 
 const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
 const MODEL_NAME = "gemini-1.0-pro";
 
 const cache = new Map();
 
 const requestTimestamps = {};
 const REQUEST_LIMIT = 5; // Max 5 requests
 const TIME_WINDOW = 60 * 1000; // 1 minute
 
    function isRateLimited(userId) {
   const now = Date.now();
   if (!requestTimestamps[userId]) {
     requestTimestamps[userId] = [];
   }
   requestTimestamps[userId] = requestTimestamps[userId].filter(
     (timestamp) => now - timestamp < TIME_WINDOW
   );
 
   if (requestTimestamps[userId].length >= REQUEST_LIMIT) {
     return true;
   }
 
   requestTimestamps[userId].push(now);
   return false;
 }
 
 async function runChat(prompt, userId = "defaultUser", retries = 3, delay = 5000) {
   try {
     if (!API_KEY) {
       throw new Error("API Key is missing. Please check your .env file.");
     }
 
     if (isRateLimited(userId)) {
       return "You have exceeded the request limit. Please wait and try again.";
     }
 
     if (cache.has(prompt)) {
       console.log("Using cached response...");
       return cache.get(prompt);
     }
 
     const genAI = new GoogleGenerativeAI(API_KEY);
     const model = genAI.getGenerativeModel({ model: MODEL_NAME });
 
     const generationConfig = {
       temperature: 0.9,
       topK: 1,
       topP: 1,
       maxOutputTokens: 1024,
     };
 
     const safetySettings = [
       {
         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
       },
       {
         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
       },
       {
         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
       },
       {
         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
       },
     ];
 
     const chat = model.startChat({
       generationConfig,
       safetySettings,
       history: [],
     });
 
     const result = await chat.sendMessage(prompt);
     const response = await result.response.text();
 
     cache.set(prompt, response);
     setTimeout(() => cache.delete(prompt), 5 * 60 * 1000);
 
     return response;
   } catch (error) {
     console.error("Error in Gemini API:", error);
 
     if (error.message.includes("503") && retries > 0) {
       console.warn(`Server is overloaded. Retrying in ${delay / 1000} seconds...`);
       await new Promise((res) => setTimeout(res, delay));
       return runChat(prompt, userId, retries - 1, delay * 2);
     }
 
     return "AI service is currently overloaded. Please try again later.";
   }
 }
 
 export default runChat;
 