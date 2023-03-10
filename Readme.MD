Para usar o componente InputCep você copiaria ele para a pasta dos seu componentes react/InoutCep.tsx
e adicionar eles nas depencencias do projeto no manifest.json:

{
...
"dependencies": {
...

-        "vtex.InputCep": "0.x",
          ...
      },
      ...
  }

dentro do arquivo store/blocks/home/home.jsonc declare o componente assim:

{
"store.home": {
"blocks": [

-           "InputCep",
                ...
            ]
            ...
        }
        ...
  }

ja o interfaces.json:

{
"viacep": {
"component": "InputCep"
}
}
