import Anthropic from "@anthropic-ai/sdk";
import { Request, Response } from "express";
import pool from "../db";


export const interviewPrompt = async (req: Request, res: Response) => {
    try {
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

        const { jobDescription, daysUntilInterview, questionCount }
            = req.body as { jobDescription: string, daysUntilInterview: number, questionCount: number };

        const userID = req.user.id;

        // Model 'claude-haiku-4-5-20251001' 'claude-opus-4-6'
        const message = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            messages: [{
                role: 'user', content: `You are an interview trainer helping a candidate prepare 
            for an interview in ${daysUntilInterview}. Given this job description: ${jobDescription} 
            Generate ${questionCount} interview questions ranging from technical, conceptual and behavioral.  
            Respond ONLY with a JSON array in this format, 
            no other text:[ { "question": "...", "answer": "..." }]` }]
        });

        const questions = (message.content[0] as { type: 'text', text: string }).text;

        const result = await pool.query('insert into sessions (user_id,job_description) values ($1,$2)', [userID, jobDescription]);

        const cleaned = questions.replace(/```json\n?|\n?```/g, '').trim();
        const parsedQuestions = JSON.parse(cleaned);

        res.status(200).json(parsedQuestions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }

}


