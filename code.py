import os
import openai

def get_time_complexity(code):
  api_key = os.environ["OPENAI_API_KEY"]
  openai = openai.Client(api_key=api_key)

  prompt = """
  What is the time complexity of the following code?

  """
  prompt += code

  response = openai.Completion.create(
    engine="davinci",
    prompt=prompt,
    temperature=0,
    max_tokens=256
  )

  time_complexity = response["choices"][0].text.strip()
  return time_complexity

def main():
  code = """
  def factorial(n):
    if n == 0:
      return 1
    else:
      return n * factorial(n - 1)
  """

  time_complexity = get_time_complexity(code)
  print("The time complexity of the code is:", time_complexity)

if __name__ == "__main__":
  main()
