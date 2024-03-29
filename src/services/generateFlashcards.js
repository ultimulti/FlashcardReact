

const generateFlashcards = async (inpText) => {
    const OpenAi = require('openai');
    const openai = new OpenAi({ apiKey:  process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${inpText} generate 5 quizlets using the content with the following format:
    ID: order of generating, add a comma
    QUESTION: maximum 20 words, add a comma
    ANSWER: maximum 3 words, add a semicolon` }],
  });
    let temptext = await response.data.choices[0].text;

    // let text = "ID: 1, QUESTION: What indicates air's moisture level?, ANSWER: Relative humidity; ID: 2, QUESTION: When does air reach 100% RH?, ANSWER: Dew point; ID: 3, QUESTION: Which heat transfer lacks medium?, ANSWER: Radiation; ID: 4, QUESTION: How does clothing influence convection?, ANSWER: Limits it; ID: 5, QUESTION: What enables heat conduction?, ANSWER: Direct contact;";

    // console.log(response.data.choices[0].text);
    function processResponseText(text) {
        let flashcards = [];
        let splitText = text.split(";");
        splitText.forEach((element) => {
            if (element === "") return;
            let splitElement = element.split(",");
            console.log("Split Element:");
            console.log(splitElement);
            let id = splitElement[0].split(":")[1].trim();
            let question = splitElement[1].split(":")[1].trim();
            let answer = splitElement[2].split(":")[1].trim();
            flashcards.push({ id: id, question: question, answer: answer });
        });
        console.log(flashcards);
        return flashcards;
    }
    
  return await processResponseText(temptext);
};

export default generateFlashcards;