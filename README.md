# LLM Classification

This is a repo dedicated to breaking down how to do robust calssification at enterprise scale.

## LLM Classification Pipeline



## Trade Offs
There are a variety of trade offs that have to be considered when working with LLMs.

1. Cost - LLMs are expensive
2. Timeline - How quickly you need the feature
3. Quality - Accuracy, False Positive rate, False negative rate, precision, recall, F1 score
4. Iteration speed - How quickly you can make changes on the classification pipeline

### Cost
If cost is a large issue there are a large number of optimizations we can make.
1. Use a finetuned model like llama 70B sample from it multiple times, use an llm to classify which is best and it is often possible to get performance equal to that of GPT-4 and equivilant models.
 - The trade off here is that this takes a long time and a lot of infrastructure to set up and deploy. You need familiarity with VLLM, tensorRT or some other LLM deployment framework or tool suite.
 - The iteration speed will also be lower and smaller fine tuned models are often times more sensitive to prompt changes
 - Quality of the finetuned model will likely not be greater than a large model like GPT-4/claude etc

2. Work on shrinking the prompt and retrieved context
   - By shrinking the number of tokens pushed into the model the compute the model has to spend will drop accordingly
   - This take time to do
   - You need to verify quality every step of the way
   - This often will go hand in hand with iteration speed. You will need a quality benchmark that is solid and robust, that allows you to change prompts and retrieved tokens. 
3. 


