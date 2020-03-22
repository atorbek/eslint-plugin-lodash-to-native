## ESLint плагин 

Плагин для ESLint. Содержит правила замены функции `_.map`
библиотеки [lodash](https://lodash.com) на нативный `Array.map`

### Установка

Необходимо установить [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```
Установить плагин `eslint-plugin-lodash-to-native`:

```
$ npm install -S git+ssh://git@github.com/atorbek/eslint-plugin-lodash-to-native.git
```

### Подключение

В конфигурационный файл `.eslintrc`, секция `plugins`, добавить

```json
{
    "plugins": [
        "lodash-to-native"
    ]
}
```

В секции `rules` указать правило `lodash-to-native/rule-name`

```json
{
    "rules": {
        "lodash-to-native/rule-name": 2
    }
}
```

### Правила замены и примеры

1. Замена на нативный `Array.map` c проверкой, что коллекция является массивом. Пример,

    Конструкция вида
    
    ```javascript 
    return _.map(collection, fn);
    ```
   
    замениться на

    ```javascript 
    return (Array.isArray(collection)) ? collection.map(fn) : _.map(collection, fn);
    ```
 
2. Замена на `Array.map` без проверки, что коллекция является массивом, 
если параметр в `_map` массив. Пример,

    Конструкция вида
    
    ```javascript 
    _.map([1, 2, 3], fn)
    ```
    
    замениться на
    
    ```javascript 
    [1, 2, 3].map(fn) 
     ```

3. Отсутствие замены если параметр `_map` объект. Пример,
 
    ```javascript 
    _.map({a: 1, b: 2}, fn)
    ```
4. Замена до переопределения `_`. Пример,
    
   ```javascript 
    var m1 = _.map([], fn); // здесь должно сработать
    _ = {map: () => []};
    var m2 = _.map([], fn); // здесь НЕ должно сработать
     ```

### Разработчику

#### Запуск автотестов

В `eslint-plugin-lodash-to-native/tests/lib/rules` написаны тесты
на основные правила. 

Для запуска необходимо выполнить команду:

```
$ npm run test
```

#### Репозиторий с примерами

Отдельно создал репозиторий [https://github.com/atorbek/eslint-plugin-lodash-to-native-test](https://github.com/atorbek/eslint-plugin-lodash-to-native-test),
с подключенным плагином и примерами кода.



