import re
import json

engines_file = "../src/Engine.ts"
with open(engines_file) as f:
    engines_file_content = f.read()


lang_to_engine = {}


for match in re.finditer(
    r'^const (?P<eng_func>eng_(?P<lang>[a-z]+)(_[a-z]+)?).+?\(["\'](?P<eng_name>\w+)',
    engines_file_content,
    re.MULTILINE,
):
    lang, eng_name, eng_func = (match["lang"], match["eng_name"], match["eng_func"])
    if not lang_to_engine.get(lang):
        lang_to_engine.update({lang: {}})
    lang_to_engine[lang].update({eng_name: eng_func})


lang_to_engine = re.sub(
    r'"(eng_.+?)"', r"\1", json.dumps(lang_to_engine, sort_keys=True)
)
print(lang_to_engine)

engines_file_content = re.sub(
    r"export let ENGINES.+?;",
    "export let ENGINES: { [lang: string]: { [engine: string]: Engine } } = "
    + lang_to_engine
    + ";",
    engines_file_content,
    flags=re.DOTALL,
)
with open(engines_file, "w") as f:
    f.write(engines_file_content)
