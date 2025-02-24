import {
   GoogleGenerativeAI,
   HarmCategory,
   HarmBlockThreshold,
 } from "@google/generative-ai";
 
 const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
 const MODEL_NAME = "gemini-1.0-pro";
 
 async function runChat(prompt, retries = 3, delay = 5000) {
   try {
     if (!API_KEY) {
       throw new Error("API Key is missing. Please check your .env file.");
     }
 
     const genAI = new GoogleGenerativeAI(API_KEY);
     const model = genAI.getGenerativeModel({ model: MODEL_NAME });
 
     const generationConfig = {
       temperature: 0.9,
       topK: 1,
       topP: 1,
       maxOutputTokens: 2048,
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
     const response = result.response;
     return await response.text();
   } catch (error) {
     console.error("Error in Gemini API:", error);
 
     if (error.message.includes("503") && retries > 0) {
       console.warn(`Server is overloaded. Retrying in ${delay / 1000} seconds...`);
       await new Promise((res) => setTimeout(res, delay));
       return runChat(prompt, retries - 1, delay * 2);
     }
 
     return "AI service is currently overloaded. Please try again later.";
   }
 }
 
 export default runChat;
 