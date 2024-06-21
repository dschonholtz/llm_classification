import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    title: "Effective LLM Classification",
    content: "A comprehensive guide to working with LLMs for classification tasks",
    tips: [
      "Understanding the LLM pipeline",
      "Effective prompting techniques",
      "Structured output formats",
      "Evaluation and iteration"
    ]
  },
  {
    title: "Simple Prompt-Based Classification",
    content: "Start with a basic LLM and a prompt for classification.",
    pipeline: ["Prompt", "LLM"],
    focus: "LLM",
    tips: [
      "Quick to implement",
      "Flexible for various tasks",
      "May have inconsistent results",
      "Lacks quality control"
    ]
  },
  {
    title: "Evaluation Against Dataset",
    content: "Introduce a dataset to evaluate LLM performance.",
    pipeline: ["Prompt", "LLM", "Evaluate"],
    focus: "Evaluate",
    tips: [
      "Quantifiable performance metrics",
      "Ability to detect inconsistencies",
      "Potential mismatch with real-world data",
      "Dataset maintenance overhead"
    ]
  },
  {
    title: "Iteration and Improvement",
    content: "Establish a cycle of refining prompts and re-evaluating.",
    pipeline: ["Prompt", "LLM", "Evaluate", "Iterate"],
    focus: "Iterate",
    tips: [
      "Continuous performance improvement",
      "Adaptability to specific use cases",
      "Time-consuming process",
      "Risk of overfitting to test set"
    ]
  },
  {
    title: "Data Preprocessing",
    content: "Implement data cleaning and standardization steps.",
    pipeline: ["Preprocess", "Prompt", "LLM", "Evaluate", "Iterate"],
    focus: "Preprocess",
    tips: [
      "More consistent input format",
      "Reduced noise in data",
      "Potential loss of important information",
      "Increased pipeline complexity"
    ]
  },
  {
    title: "Augment with Retrieval",
    content: "Fetch relevant data to enhance the prompt with context.",
    pipeline: ["Preprocess", "Retrieve", "Prompt", "LLM", "Evaluate", "Iterate"],
    focus: "Retrieve",
    tips: [
      "Enhanced context for better decision-making",
      "Improved handling of edge cases",
      "Increased latency",
      "Potential for irrelevant information"
    ]
  },
  {
    title: "Effective Prompting: Expert Framing",
    content: "Boost performance by framing the LLM as an expert",
    tips: [
      "Start with: 'You are an expert in [task_name]'",
      "Describe relevant qualifications or experience",
      "Example: 'You are an expert linguist with 20 years of experience in sentiment analysis'"
    ]
  },
  {
    title: "Effective Prompting: Example-Driven",
    content: "Show the LLM exactly what you want",
    tips: [
      "Provide a concrete example of the desired output",
      "Use the same format and style you expect in the result",
      "Include edge cases or difficult examples if relevant"
    ]
  },
  {
    title: "Structured Output: XML/HTML",
    content: "Leverage LLM's familiarity with markup languages",
    tips: [
      "Use XML or HTML tags to structure the output",
      "Example: <classification><category>Positive</category><confidence>8</confidence></classification>",
      "LLMs have extensive training on these formats due to web data",
      "Use simple integer values (1-10) for numeric data"
    ]
  },
  {
    title: "Structured Output: JSON",
    content: "Utilize JSON for easy parsing and processing",
    tips: [
      "Request output in JSON format",
      "Example: {'category': 'Positive', 'confidence': 8}",
      "Ideal for integration with downstream processes",
      "Note: Complex JSON can be challenging for LLMs",
      "Minimize whitespace to reduce token count",
      "For complex structures, consider providing a template"
    ]
  },
  {
    title: "Structured Output: Markdown Tables",
    content: "Use Markdown for human-readable structured output",
    tips: [
      "Request results in a Markdown table format",
      "Example:",
      "| Category | Confidence |\n|-----------|------------|\n| Positive  | 8          |",
      "Balances machine-readability and human-readability",
      "Use simple integer values (1-10) for numeric data"
    ]
  },
  {
    title: "Prompt Engineering Best Practices",
    content: "Key techniques for effective LLM prompts",
    tips: [
      "Be specific and clear in instructions",
      "Use consistent formatting",
      "Provide relevant context",
      "Incorporate few-shot learning examples",
      "Encourage step-by-step reasoning (Chain of Thought)"
    ]
  },
  {
    title: "ReAct Framework",
    content: "Reasoning and Acting in classification prompts",
    tips: [
      "Break down complex tasks into steps",
      "Alternate between reasoning and action steps",
      "Allow for self-correction and refinement",
      "Example: 'Reason about the sentiment, then classify, then explain your decision'"
    ]
  },
  {
    title: "Evaluation Metrics",
    content: "Key metrics for assessing classification performance",
    tips: [
      "Accuracy: Overall correctness",
      "Precision & Recall: Balancing specificity and sensitivity",
      "F1 Score: Harmonic mean of precision and recall",
      "Confusion Matrix: Detailed breakdown of predictions"
    ]
  },
  {
    title: "Iterative Improvement",
    content: "Continuously refine your LLM classification system",
    tips: [
      "Analyze errors to identify patterns",
      "Refine prompts based on metric insights",
      "Experiment with different structured output formats",
      "Regularly update your evaluation dataset",
      "Consider A/B testing for prompt variations"
    ]
  },
  {
    title: "Putting It All Together",
    content: "A holistic approach to LLM classification",
    tips: [
      "Combine expert framing, example-driven prompts, and structured outputs",
      "Continuously evaluate and iterate on your system",
      "Balance between performance, cost, and latency",
      "Stay updated on latest LLM developments and techniques"
    ]
  }
];

const PipelineStep = ({ step, isFocus }) => (
  <div className={`px-4 py-2 rounded-full ${isFocus ? 'bg-green-500' : 'bg-blue-500'} text-white transition-all duration-300 ease-in-out`}>
    {step}
  </div>
);

const Slide = ({ slide }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8">
    <h2 className="text-3xl font-bold mb-6">{slide.title}</h2>
    <p className="text-xl mb-8">{slide.content}</p>
    {slide.pipeline && (
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        {slide.pipeline.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="w-4 h-0.5 bg-blue-500"></div>}
            <PipelineStep step={step} isFocus={step === slide.focus} />
          </React.Fragment>
        ))}
      </div>
    )}
    <div>
      <ul className="list-disc pl-5">
        {slide.tips.map((tip, index) => (
          <li key={index} className="text-lg mb-2">{tip}</li>
        ))}
      </ul>
    </div>
  </div>
);

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-lg shadow-lg p-8 relative">
        <Slide slide={slides[currentSlide]} />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-4">
          <Button onClick={prevSlide} disabled={currentSlide === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-gray-500">
            {currentSlide + 1} / {slides.length}
          </span>
          <Button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
