.PHONY: test lint verify clean

test:
	python3 -m pytest tests/ -v

lint:
	@find . -name "*.py" -not -path "./.git/*" -not -path "*/__pycache__/*" | xargs python3 -m py_compile

verify: lint test

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true