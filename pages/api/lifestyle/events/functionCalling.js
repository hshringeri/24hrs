const { Configuration, OpenAIApi } = require("openai");
import { loadDocuments }from './updateCalendar'

const axios = require("axios");    // For making HTTP requests.


const event1 = "get groceries from walmart"
const event2 = "go to the gym 4 times a week"
const event3 = "study for my OS midterm"
const event4 = "make dinner every day"

const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

export async function addEvent(event) {
    const eventType = await determineEventType(event)
    
    if (eventType ===  'errand/chore') {
        console.log("1")
        const events = await handleSimpleEvent(event)
        console.log(events)
        const scheduledEvents = await loadDocuments(events)
        return scheduledEvents;
        
    }
    if (eventType === 'learning event') {
        console.log("2")
        const events = await handleLearningEvent(event)
        console.log(events);
        const scheduledEvents = await loadDocuments(events)
        return scheduledEvents;


    }
    if (eventType === 'activity') {
        console.log("3")
        const events = await handleSimpleEvent(event)
        console.log(events)
        const scheduledEvents = await loadDocuments(events)
        return scheduledEvents;

    }
    

}

async function determineEventType(event) {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": event}],
            functions: [
                {
                    name: "determineEventType",
                    description: "determine whether the event is an errand/chore or something else",
                    parameters: {
                        type: "object",
                        properties: {
                            isErrandOrChore: {
                                type: "boolean",
                                description: "Is the event specified an errand or chore"
                            },
                            isALearningEvent: {
                                type: "boolean",
                                description: "Does the event require a learning curve? (studying, learning, projects, writing, coding etc.)"
                            },
                            isAnActivity: {
                                type: "boolean",
                                description: "Is the event an activity? (sports, video games, lunch, dinner, going to gym, exploring, fun things etc)"
                            }
                        }
                    }
                }
            ],
            function_call: "auto"
        })
        console.log(completion.data.choices[0].message)
        const completionResponse = completion.data.choices[0].message.function_call.arguments;

        const isErrandOrChore = JSON.parse(completionResponse).isErrandOrChore
        const isALearningEvent = JSON.parse(completionResponse).isALearningEvent
        const isAnActivity = JSON.parse(completionResponse).isAnActivity



        if (isErrandOrChore) {
            console.log(event)
            console.log('errand/chore')
            return 'errand/chore'
        }
        if (isALearningEvent) {
            console.log(event)
            console.log('learning event')
            return 'learning event'
        }
        if (isAnActivity) {
            console.log(event)
            console.log('activity')
            return 'activity'
        }

    } catch(err) {
        console.log(err)
    }
}

async function handleSimpleEvent(event) {
    const events = []
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": event}],
            functions: [
                {
                    name: "handleErrandOrChore",
                    description: "Create calendar events for errands, chores or activities",
                    parameters: {
                        type: "object",
                        properties: {
                            event: {
                                type: "string",
                                description: "Based on the content of the user prompted event, create an event name for the task"
                            },
                            probable_duration: {
                                type: "string",
                                description: "Based on the content of the user prompted event, figure out how long this event on a daily basis"
                            },
                            days_per_week: {
                                type: "string",
                                description: "Based on the content of the user prompted event, determine how many days per week the user wants this task to be done."
                            }
                        }
                    }
                }
            ],
            function_call: "auto"
        })
        const completionResponse = completion.data.choices[0].message.function_call.arguments;
        events.push(JSON.parse(completionResponse))
        return events
    
    } catch(error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
            console.log(messages);
          }
        
    }

}

async function handleLearningEvent(event) {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": event}],
            functions: [
                {
                    name: "handleLearningEvent",
                    description: "Create calendar events for learning events",
                    parameters: {
                        type: "object",
                        properties: {
                            mediums: {
                                type: "array",
                                description: "Based on the content of the event, create a list of ways to learn/go about the what the user wants to do.",
                                items: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            ],
            function_call: "auto"
        })

        const completionResponse = completion.data.choices[0].message.function_call.arguments;
        const mediums = JSON.parse(completionResponse).mediums

        const events = [];

        for (const medium of mediums) {
            const prompt = event + ": " + medium;

            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": prompt}],
                functions: [
                    {
                        name: "handleBrokenDownLearningEvents",
                        description: "Create calendar events for errands or chores",
                        parameters: {
                            type: "object",
                            properties: {
                                event: {
                                    type: "string",
                                    description: "describe the task in a very detailed manner"
                                },
                                probable_duration: {
                                    type: "string",
                                    description: "Based on the content of the user prompted event, figure out how long this event on a daily basis"
                                },
                                days_per_week: {
                                    type: "string",
                                    description: "Based on the content of the user prompted event, determine how many days per week the user wants this task to be done."
                                }
                            }
                        }
                    }
                ],
                function_call: "auto"
            });

            const completionResponse = completion.data.choices[0].message.function_call.arguments;
            events.push(JSON.parse(completionResponse));
            
        }
        return events;

    } catch (error) {
        console.log(error)
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);

        }
    }
}


//addEvent(event4)

// determineEventType(event2)

// determineEventType(event3)

// determineEventType(event4)

 //handleErrandOrChore(event1)
// handleErrandOrChore(event2)
// handleErrandOrChore(event4

//handleLearningEvent("work on personal project")






