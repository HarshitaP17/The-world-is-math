# 🤖 AI-Assisted Development Guide

This document describes how Claude AI (Claude Code) should approach development on this project.

## Project Identity

**The World is Math** is an advanced, mathematically rigorous platform for discovering hidden mathematical structures in images through ML-powered analysis, AR visualization, and community collaboration.

Key principles:
- 🎓 **Mathematically rigorous** - All analyses must be grounded in formal mathematics
- 🧠 **Intellectually engaging** - Target curious minds who want *understanding*, not just answers
- 🎨 **Visually elegant** - Beautiful UI inspired by the "Pure Math" aesthetic
- 🚀 **Production-ready** - Phase 2 is an ambitious, full-featured platform

## Development Focus

### Phase 2a (Current): Foundation
- React Native app with basic image upload/capture
- FastAPI backend with initial ML models
- PostgreSQL + Redis infrastructure
- **Priority:** Get end-to-end pipeline working with at least one ML model

### Backend Development
- **Language:** Python with FastAPI
- **ML Frameworks:** PyTorch primary, TensorFlow for specific models
- **Database:** PostgreSQL for persistent data, pgvector for embeddings
- **API Style:** RESTful with comprehensive Swagger docs
- **Testing:** pytest with >80% coverage for ML services

### Mobile Development
- **Framework:** React Native + Expo for rapid development
- **State Management:** Redux for complex state
- **Camera/AR:** Expo Camera + AR libraries for real-time analysis
- **Testing:** React Native Testing Library

### Web Development
- **Framework:** Next.js 14 with App Router
- **Visualization:** Three.js for 3D models, D3.js for data viz
- **Styling:** Tailwind CSS with custom "Pure Math" theme
- **State:** Zustand for client state

## Code Quality Standards

### AI-Specific Guidelines
1. **No premature abstractions** - Write code for the current task, not hypothetical futures
2. **Clear naming** - Mathematical and domain-specific terminology
3. **Minimal comments** - Code should be self-documenting; only explain *why*, not *what*
4. **Tests first (when uncertain)** - For ML models, define expected behavior before training
5. **Verify ML outputs** - Never assume model accuracy; always verify with ground truth

### ML Model Development
- Use `models/` directory for trained model files
- Version all models (e.g., `geometric_v1.pth`, `fractal_v2.pth`)
- Document model architecture, training data, and expected accuracy
- Include sample outputs and test cases in model documentation
- Link to academic papers that inspired the approach

### Documentation
- Keep DEVELOPMENT.md, README.md, and this file synchronized
- For major features, add to docs/ directory with clear examples
- API endpoints should have comprehensive docstrings
- ML models should include scientific references

## Commit Conventions

```
format: feat/fix/docs/refactor: description

Example commits:
- "feat: implement geometric shape detector using Hough transform"
- "fix: correct fractal dimension calculation in fractal detector"
- "docs: add mathematical background for symmetry groups"
- "refactor: consolidate ML model loading to single service"

Include context about *why* the change matters mathematically.
```

## Communication Style

- Be **direct and technical** - avoid marketing language
- Use **mathematical terminology** accurately
- Provide **evidence** for ML performance claims
- **Ask before** implementing ambiguous features
- Prefer **working code** over lengthy documentation

## Code Review Checklist (for Claude)

- [ ] Does the code implement exactly what was requested?
- [ ] Are all edge cases handled?
- [ ] Is the ML model accuracy verified?
- [ ] Are tests passing and sufficient?
- [ ] Does the code follow this guide's principles?
- [ ] Is the math correct and cited?
- [ ] Will this need updates if related code changes?

## Things Claude Should Avoid

- ❌ Adding features beyond the request
- ❌ Implementing patterns "for future use"
- ❌ Renaming for consistency across the entire codebase
- ❌ Performance optimization before profiling
- ❌ Complex error handling for impossible scenarios
- ❌ Assuming ML models work without verification

## When to Ask for Clarification

- Ambiguous requirements
- Conflicting priorities
- Large scope changes
- New technology choices
- Risky operations (data deletion, API changes)

## Resources

- Architecture: See `ARCHITECTURE.md` (to be created)
- API Docs: Run backend, visit `http://localhost:8000/docs`
- ML Models: See `models/README.md` (to be created)
- Design System: See web component library (to be built)

---

Remember: Code clarity and mathematical rigor > clever solutions.
