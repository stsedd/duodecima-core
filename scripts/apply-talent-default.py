from pathlib import Path
p=Path('data/sistema.json')
s=p.read_text(encoding='utf-8')
old='"talents": {"gainLevels": [1,30,60,90], "defaultRepeatable": true}'
new='"talents": {"gainLevels": [1,30,60,90], "startsWithTalent": true, "defaultRepeatable": false}'
if old not in s:
    raise SystemExit('Trecho canônico de talentos não encontrado em data/sistema.json')
p.write_text(s.replace(old,new,1),encoding='utf-8')
