var assert = chai.assert;

suite('Analizador lexico', function() {
setup(function(){
  if (typeof __html__ !== 'undefined') {
  document.body.innerHTML = __html__['tests/index.html'];
  input = document.getElementById('INPUT');
  ouput = document.getElementById('OUTPUT');
  }
  });

  test('Prueba declaracion de variable.', function() {
  INPUT.value = 'var a = "hello";';
  main();
  assert.deepEqual(OUTPUT.innerHTML, '{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "a",\n        "arity": "name"\n    },\n    "second": {\n        "value": "hello",\n        "arity": "literal"\n    }\n}');
  });
  
  test('Prueba declaracion de una funcion.', function() {
  INPUT.value = 'var a = "hello"; // initialize a \nvar b = function(x) {var c = 3;return x+c; };';
  main();
  assert.deepEqual(OUTPUT.innerHTML, '[\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": {\n            "value": "a",\n            "arity": "name"\n        },\n        "second": {\n            "value": "hello",\n            "arity": "literal"\n        }\n    },\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": {\n            "value": "b",\n            "arity": "name"\n        },\n        "second": {\n            "value": "function",\n            "arity": "function",\n            "first": [\n                {\n                    "value": "x",\n                    "arity": "name"\n                }\n            ],\n            "second": [\n                {\n                    "value": "=",\n                    "arity": "binary",\n                    "first": {\n                        "value": "c",\n                        "arity": "name"\n                    },\n                    "second": {\n                        "value": 3,\n                        "arity": "literal"\n                    }\n                },\n                {\n                    "value": "return",\n                    "arity": "statement",\n                    "first": {\n                        "value": "+",\n                        "arity": "binary",\n                        "first": {\n                            "value": "x",\n                            "arity": "name"\n                        },\n                        "second": {\n                            "value": "c",\n                            "arity": "name"\n                        }\n                    }\n                }\n            ]\n        }\n    }\n]');
  });
  
  test('Prueba statement', function() {
  INPUT.value = 'var a = 2;\nif(a ===2){}';
  main();
  assert.deepEqual(OUTPUT.innerHTML, '[\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": {\n            "value": "a",\n            "arity": "name"\n        },\n        "second": {\n            "value": 2,\n            "arity": "literal"\n        }\n    },\n    {\n        "value": "if",\n        "arity": "statement",\n        "first": {\n            "value": "===",\n            "arity": "binary",\n            "first": {\n                "value": "a",\n                "arity": "name"\n            },\n            "second": {\n                "value": 2,\n                "arity": "literal"\n            }\n        },\n        "second": null,\n        "third": null\n    }\n]');
  });
  
  test('Prueba syntax error', function() {
  INPUT.value = 'var a = $';
  main();
  assert.deepEqual(OUTPUT.innerHTML, '"Syntax error near \'$\'"');
  });
  
  test('Prueba require();', function() {
  INPUT.value = 'require("hola");';
  main();
  assert.deepEqual(OUTPUT.innerHTML, '{\n    "name": "TypeError",\n    "message": "this.error is not a function"\n}');
  });
  
  test('Prueba var=require();', function() {
  INPUT.value = 'var a = require("hola");';
  main();'{\n "value": "=",\n "arity": "binary",\n "first": {\n "value": "a",\n "arity": "name"\n },\n "second": {\n "value": "require",\n "arity": "function",\n "first": {\n "value": "hola",\n "arity": "literal"\n }\n }\n}'
  assert.deepEqual(OUTPUT.innerHTML, '{\n    "name": "TypeError",\n    "message": "this.error is not a function"\n}');
  });
});