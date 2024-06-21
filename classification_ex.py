import xml.etree.ElementTree as ET
from typing import List, Dict

# Step 1: Data Preprocessing
def preprocess_articles(articles: List[Dict]) -> List[Dict]:
    # TODO: Implement preprocessing logic
    # This could include text cleaning, removing HTML tags, etc.
    # This also might involve extracting keywords with a very cheap LLM to do retrieval with.
    return articles

# Step 2: Retrieval
def retrieve_relevant_context(articles: List[Dict], question: str) -> List[Dict]:
    # TODO: Implement retrieval logic
    # This could involve semantic search or other relevance scoring
    # likely cosine similarity, might be BM25 or other spare retrieval techniques
    # 
    return articles

# Step 3: Prompt Engineering
def create_prompt(articles: List[Dict], question: str) -> str:
    # TODO: Implement prompt creation
    # This should include expert framing, examples, and clear instructions
    prompt = f"""
    You are an expert fitness consultant with years of experience in matching articles to user needs.
    Given the following list of fitness articles and a user question, determine which articles are most relevant.
    Provide your response in the following XML format:
    <classification>
        <relevant_articles>
            <article>
                <id>[Article ID]</id>
                <relevance_score>[1-10]</relevance_score>
                <reason>[Brief explanation]</reason>
            </article>
            <!-- Repeat for each relevant article -->
        </relevant_articles>
    </classification>

    User Question: {question}

    Articles:
    {articles}

    Classify the articles and explain your reasoning.
    """
    return prompt

# Step 4: LLM Interaction
def query_llm(prompt: str) -> str:
    # TODO: Implement LLM API call
    # This would involve sending the prompt to the LLM and getting the response
    mock_response = """
    <classification>
        <relevant_articles>
            <article>
                <id>1</id>
                <relevance_score>9</relevance_score>
                <reason>Directly addresses user's question about weight loss</reason>
            </article>
            <article>
                <id>3</id>
                <relevance_score>7</relevance_score>
                <reason>Provides complementary information on nutrition</reason>
            </article>
        </relevant_articles>
    </classification>
    """
    return mock_response

# Step 5: Parse LLM Response
def parse_llm_response(response: str) -> List[Dict]:
    try:
        root = ET.fromstring(response)
        parsed_articles = []
        for article in root.findall('.//article'):
            parsed_articles.append({
                'id': article.find('id').text,
                'relevance_score': int(article.find('relevance_score').text),
                'reason': article.find('reason').text
            })
        return parsed_articles
    except ET.ParseError as e:
        print(f"Error parsing XML: {e}")
        return []

# Step 6: Evaluation
def evaluate_classification(classified_articles: List[Dict], ground_truth: List[Dict]) -> Dict:
    # TODO: Implement evaluation metrics
    # This could include accuracy, precision, recall, F1 score, etc.
    # you also might want to throw the jaccard index in here. Show the intersection over union. 
    # Where intersection is predicted articles intersecting expected articles 
    # and union is all predicted and all expected
    return {"accuracy": 0.0, "precision": 0.0, "recall": 0.0, "f1_score": 0.0}

# Step 7: Iteration
def iterate_and_improve(evaluation_results: Dict) -> None:
    # TODO: Implement iteration logic
    # This could involve adjusting the prompt, fine-tuning the LLM, etc.
    # This probably shouldn't be a function...
    pass

def main():
    # Sample data (I really hate these, but they work for now)
    articles = [
        {"id": 1, "title": "10 Best Exercises for Weight Loss", "content": "..."},
        {"id": 2, "title": "Building Muscle: A Beginner's Guide", "content": "..."},
        {"id": 3, "title": "The Role of Nutrition in Fitness", "content": "..."},
        # Add more articles as needed
    ]
    user_question = "What are the best exercises for losing weight?"

    # Run the classification pipeline
    preprocessed_articles = preprocess_articles(articles)
    relevant_context = retrieve_relevant_context(preprocessed_articles, user_question)
    prompt = create_prompt(relevant_context, user_question)
    llm_response = query_llm(prompt)
    classified_articles = parse_llm_response(llm_response)

    print("Classified Articles:")
    for article in classified_articles:
        print(f"Article ID: {article['id']}")
        print(f"Relevance Score: {article['relevance_score']}")
        print(f"Reason: {article['reason']}")
        print()

    # TODO: Implement evaluation and iteration steps
    # evaluation_results = evaluate_classification(classified_articles, ground_truth)
    # iterate_and_improve(evaluation_results)

if __name__ == "__main__":
    main()
