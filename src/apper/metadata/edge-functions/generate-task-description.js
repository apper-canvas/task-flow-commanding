import apper from 'https://cdn.apper.io/actions/apper-actions.js'
import OpenAI from 'npm:openai'

apper.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Method not allowed. Use POST.' 
      }),
      { 
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    const body = await req.json()
    const { title } = body

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Title is required and must be a non-empty string' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const apiKey = await apper.getSecret('OPENAI_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'OpenAI API key not configured' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const openai = new OpenAI({ apiKey })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates concise, actionable task descriptions based on task titles. Keep descriptions between 1-3 sentences, focused on what needs to be done and why it matters.'
        },
        {
          role: 'user',
          content: `Generate a task description for: "${title.trim()}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    })

    const description = completion.choices[0]?.message?.content?.trim()

    if (!description) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to generate description from OpenAI' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        description 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred'
    const statusCode = error.status || 500

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `OpenAI API error: ${errorMessage}` 
      }),
      { 
        status: statusCode,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})