import random

def extract_choices(cont_text, n=3):
    sents = [s.strip() for s in cont_text.replace('\n', ' ').split('.') if s.strip()]
    choices = []
    for s in sents:
        if 3 < len(s.split()) <= 12:
            choices.append(s.strip())
        if len(choices) >= n:
            break
    while len(choices) < n:
        choices.append(random.choice(["Explore the cave", "Run away", "Talk to the stranger", "Open the chest"]))
    return choices
