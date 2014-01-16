InEvent
========

Português (em desenvolvimento)
========

Esse é o SDK oficial do InEvent para JS. Toda sua documentação pode ser acessada em [http://inevent.us/developer/](http://inevent.us/developer/).

A SDK não necessita de nenhuma dependência.

Funcionamento
--------
Como a SDK está sendo desenvolvida, não foi liberada uma versão `.min`.

Inclua todos os arquivos das pastas `controllers` e `models`.

*OBS: Todos os __callbacks__ devem ser no formato: function(data, exception){}*

```js
var inevent = new InEvent({
	cookies : true // or false
});
```

Para acessar algum controlador, execute: `inevent.NOMEDOCONTROLADOR`.

Exemplo:

```js
var eventController = inevent.eventController;
```

Para pegar um único evento:

```js
var eventID = 1;
var tokenID = null;

eventController.getSingle(eventID, tokenID, function(data, exception)
{
	if(exception)
		console.log(exception);
	else
		console.log(data); // Objeto do tipo Event
});
```

Controladores
--------
Controladores criados até o momento:
+ InEvent
+ Api
+ ExceptionController
+ EventController (acessado apenas em InEvent.eventController).
+ PersonController (acessado apenas em InEvent.personController).

Modelos criados até o momento:
+ Exception (acesso bloqueado - gerado em ExceptionController).
+ Person (acessado bloqueado - gerado em PersonController).
+ Event (acessado bloqueado - gerado em EventController).
+ Activity (acessado bloqueado - gerado em EventController/acessado em Event).

Exceções
--------
No `ExceptionController` é possível verificar *todas* as exceções lançadas e a *última* exceção lançada.

Para cada exceção em `ExceptionController`, é possível ver:
- O status retornado pela API e sua resposta (caso haja um acesso pela API);
- Um texto simples informando qual foi o problema (caso não haja acesso à API);
- O local que foi lançada a exceção (ex: "Person.signIn");

Exemplo
--------
Acesse o arquivo `example.js` para um exemplo prático de como usar o SDK. Também está incluso um arquivo `example.html` para ser executado direto do browser.

Sobre
--------
InEvent é uma criação do Estúdio Trilha.

English (under development)
========

This is InEvent's official JS SDK. All its documentation can be accessed at [http://inevent.us/developer/](http://inevent.us/developer/).

This SDK doesn't need any dependencies.

How-to
--------
Access the file `example.js` for a SDK How-to. We also included a `index.html` to be executed from browser.

Support
--------
Just open an issue on Github and I'll get to it as soon as possible.

About
--------
InEvent is brought to you by Estúdio Trilha.