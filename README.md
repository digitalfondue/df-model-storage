df-model-storage
================

Persist models in the sessionStorage and restore them on page reload (link time).

Under MIT License.

## Requirements
AngularJS and a browser that support sessionStorage. 
Please note that some browsers (noticed with safari mobile) in private mode will disable the sessionStorage.


## Use/Examples:

Load the 'dfModelStorage' module in your application. See example/index.html or directly http://digitalfondue.github.io/df-model-storage/


###Persist a single field (using the ngModel directive)

```html
<input type="text" data-ng-model="testValue" data-df-model-storage>
```

###Persist a complex object

```html
<form data-df-model-storage="baseModel">
  <p><input type="text" data-ng-model="baseModel.input1"></p>
  <p><input type="text" data-ng-model="baseModel.input2"></p>
</form>
```


###Prefix the persisted model
As the name of the model will be the key of the serialized object, to avoid clashes you can prefix the model.

```html
<input type="text" data-ng-model="prefixedTestValue" data-df-model-storage data-df-prefix="index">
```

It's valid for the complex object example too:

```html
<form data-df-model-storage="prefixedBaseModel" data-df-prefix="index">
  <p><input type="text" data-ng-model="prefixedBaseModel.input1"></p>
  <p><input type="text" data-ng-model="prefixedBaseModel.input2"></p>
</form>
```

## TODO

Add some kind of minimization/test/bower packaging.
