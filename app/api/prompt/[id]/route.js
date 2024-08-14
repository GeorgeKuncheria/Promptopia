import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (request,{params}) => {

    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt){
            return new Response (JSON.stringify("Prompt not found"),{status: 404})
        }
        return new Response(JSON.stringify(prompt),{status: 200});

    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch all posts"),{status:500});
    }
}


export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};


export const DELETE = async (request,{params})=> {
    try {
        await connectToDB();

        const deletePrompt = await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify("Prompt deleted successfully"),{status: 200});
    } catch (error) {
        return new Response (JSON.stringify("Failed to delete prompt"),{status: 500});
    }
}