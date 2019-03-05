# HowTo

## document a component

### create a Page

create a .md file for your showcase and put it in the tests/dummy/app/templates/docs folder

### create a route

add a rout for your page in tests/dummy/approuter.js

### create a controller

create a controller for your route in tests/dummy/app/controllers/docs matching your route

### write a demo

### Example

{{#docs-demo as |demo|}}
  {{#demo.example name='myForm.hbs'}}
    <div class="myForm">
      <form>
        <label for="fname">First Name</label>
        {{input type="text" id="fname" name="firstname" placeholder="Your name.." value=formFirstName}}

        <label for="lname">Last Name</label>
        {{input type="text" id="lname" name="lastname" placeholder="Your last name.." value=formLastName}}
      
        <button {{action "submitAction"}}>Submit</button>
      </form>
    </div>
  {{/demo.example}}
  {{demo.snippet "myForm.hbs" label="template.hbs"}}
  {{demo.snippet "myForm.css" label="styles.scss"}}
  {{demo.snippet "howto.js" label="controller.js"}}
{{/docs-demo}}