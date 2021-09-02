import { Selector } from "testcafe";

fixture `My Fixture`
.page `http://localhost:4200/`

const nameInput = Selector('#boardName');
const Itemtitle = Selector('#title');
const Addtask = Selector('#task');

const AddBoardbutton = Selector('button')
  .with({visibilityCheck: true})
  .withExactText('Add Board');

  const AddItem = Selector('button')
  .with({visibilityCheck: true})
  .withExactText('Add Item');
  
test('My test',async t=>{  

    await t
       //Add new board
       .click(Selector('.navbar-brand').withText('New Board'))
       .expect(AddBoardbutton.hasAttribute('disabled')).ok()
       .typeText(nameInput, 'BOARD 1')
       .expect(AddBoardbutton.hasAttribute('disabled')).notOk()      
       .click(Selector('button').withText('Add Board'))
       
       //Verify the Delete Current Board button is visible and enabled
       .expect(Selector('button').withText('Delete Current Board').visible).eql(true)
       .expect(Selector('button').withText('Delete Current Board').hasAttribute('disabled')).notOk()

       //Click on Delete Current Board button 
       .click(Selector('button').withText('Delete Current Board'))

       //Verify the New Item button is not visible
       .expect(Selector('button').withText('New Item').visible).eql(false)

       //Again create a new board
       .click(Selector('.navbar-brand').withText('New Board'))
       .expect(AddBoardbutton.hasAttribute('disabled')).ok()
       .typeText(nameInput, 'BOARD 1')
       .expect(AddBoardbutton.hasAttribute('disabled')).notOk()      
       .click(Selector('button').withText('Add Board'))

       //Add a new item

       .expect(Selector('button').withText('New Item').visible).eql(true)
       .click(Selector('button').withText('New Item'))

       //Verify the Cancel button is visible and enabled
       .expect(Selector('button').withText('Cancel').visible).eql(true)

       .expect(AddItem.hasAttribute('disabled')).ok()
       .typeText(Itemtitle, 'ITEM')
       .expect(AddItem.hasAttribute('disabled')).notOk()      
       .click(AddItem)

       //Edit the Item
       .click(Selector('button').withText('Edit'))
       .typeText(Itemtitle, 'ITEM 1')
       .click(Selector('button').withText('Save'))

       //Delete the Item
       .click(Selector('button').withText('Delete'))
       .expect(Selector('#title').visible).eql(false)

       //Add new Task
       .click(Selector('.navbar-brand').withText('New Board'))
       .typeText(nameInput, 'BOARD 1')   
       .click(Selector('button').withText('Add Board'))
       .click(Selector('button').withText('New Item'))
       .typeText(Itemtitle, 'ITEM 1')
       .expect(Selector('button').withText('Add Task').visible).eql(true)
       .click(Selector('button').withText('Add Task'))
       .typeText(Addtask, 'TASK 1')
       .click(AddItem)
       
       //Verify the Edit and Delete button is visible and clickable
       .expect(Selector('button').withText('Edit').visible).eql(true)
       .expect(Selector('button').withText('Edit').hasAttribute('disabled')).notOk()
       .expect(Selector('button').withText('Delete').visible).eql(true)
       .expect(Selector('button').withText('Delete').hasAttribute('disabled')).notOk()
       
        //Verify the value of the Board in the top
        .expect(Selector('a').withAttribute('class','navbar-brand').child(0).innerText).eql('BOARD 1')
        //Verify the value of the Item 
        .expect(Selector('div').withAttribute('class','col-xs-12').child(0).innerText).eql('ITEM 1')
       //Verify the value of the Task
       .expect(Selector('li').withAttribute('class','list-group-item cdk-drag').innerText).eql('TASK 1')
});