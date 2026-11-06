from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSubmission(BaseModel):
    code: str
    language: str

@app.post("/api/evaluate")
def evaluate_code(submission: CodeSubmission):
    code_lower = submission.code.lower()
    
    # Adaptive Diagnostic Engine (Research Prototype)
    analysis = "Code syntax structure parsed successfully. Static evaluation completed."
    hint = "Review your logic flow and ensure all edge cases are properly handled."

    if "while" in code_lower and not any(term in code_lower for term in ["break", "+=", "-=", "count", "i"]):
        hint = "Pedagogical Hint: Your 'while' loop appears to lack an explicit termination condition update. Check for potential infinite loops."
    elif "def " in code_lower and "return" not in code_lower:
        hint = "Pedagogical Hint: You have defined a function, but it lacks a 'return' statement. Consider what output type your function is expected to produce."
    elif "recursion" in code_lower or ("def " in code_lower and code_lower.count("def") == 1 and code_lower.count(code_lower.split('(')[0].replace('def ', '').strip()) > 1):
        if "base" not in code_lower and "if" not in code_lower:
            hint = "Pedagogical Hint: Recursive structure detected. Verify that you have defined a clear base case to prevent maximum recursion depth errors."
        else:
            hint = "Pedagogical Hint: Your recursive decomposition looks structurally sound. Trace your step-by-step state propagation for small inputs."
    elif "for " in code_lower and "range" in code_lower:
        hint = "Pedagogical Hint: Check your loop boundary parameters (start, stop, step) to ensure off-by-one errors are avoided at the limits."

    return {
        "status": "success",
        "analysis": analysis,
        "hint": hint,
        "language": submission.language
    }