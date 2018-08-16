/*   Nichole Boothroyd
     CMPM 147 Generative Design     UCSC Summer 2018
 
     This is a anime character generator. Let's meet your next waifu.
 
     Anime Eye and Manga Mouth brushes:  ©2008-2018 Faeth-design
     Anime Hair brushes:                 ©2007-2018 OrexChan
     Background image:                   Homunculus
     UI Plugin:                          Richard Snijders <richard@fizz.nl>
*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'waifuBox', { preload: preload, create: create, update: update });
var slickUI;
var savedWaifu = false;
var panel;


function preload() {
	// preload assets
    
    game.load.path = 'assets/img/';
    game.load.images(['bg', 'body', 'shirt'],['school_background.png', 'body.png', 'shirt.png']);
    game.load.atlas('mouth', 'mouth_sheet.png', 'sprites.json');
    game.load.atlas('eyes', 'eyes_sheet.png', 'eye_sprites.json');
    game.load.atlas('iris', 'iris_sheet.png', 'iris_sprites.json');
    game.load.atlas('hair', 'hair_sheet.png', 'hair_sprites.json');
    game.load.atlas('dye', 'dye_sheet.png', 'dye_sprites.json');
    
    // Creating UI element
    slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
    slickUI.load('../ui/kenney/kenney.json'); // Use the path to your kenney.json. This is the file that defines your theme.
}

function create() {
    // place your assets
    game.add.sprite(0,0, 'bg');
    
    waifuGroup = game.add.group();
    
    //Placing body
    placeBody();
    
    //Placing eyes
    placeEyes();
    
    //Placing hair
    placeHair();
    
    //Placing mouth
    placeMouth();
    
    
    //Creating UI elements
    var saveButton;
    var reroll;
    var fuseButton;
    var hairSlider;
    var eyeSlider;
    var slideStart;
    slickUI.add(panel = new SlickUI.Element.Panel(500, 350, 250, game.height - 200));
    //Save Button
    panel.add(saveButton = new SlickUI.Element.Button(0,0, 120, 80));
    saveButton.events.onInputUp.add(saveWaifu);
    saveButton.add(new SlickUI.Element.Text(0,0, "Save Waifu")).center();
    //Reroll a character
    panel.add(reroll = new SlickUI.Element.Button(130,0, 120, 80));
    reroll.events.onInputUp.add(rerollWaifu);
    reroll.add(new SlickUI.Element.Text(0,0, "New Waifu")).center();
    //Fuse Waifu
    /*panel.add(fuseButton = new SlickUI.Element.Button(panel.width - 60,panel.height - 60, 60, 60));
    fuseButton.events.onInputUp.add(fuseWaifu);
    fuseButton.add(new SlickUI.Element.Text(0,0, "Fuse Waifu")).center();
    */
    //Hair Color Slider
    panel.add(hairSlider = new SlickUI.Element.Slider(16,110, panel.width - 32));
    hairSlider.onDrag.add(function (value) {
                      // This will log the slider's value on a scale of 100 every time the user moves the drag handle
                          if(Math.round(value * 100) == 0 || Math.round(value * 100) == 100) {
                          //do nothing
                          }
                          else if(slideStart > value) {
                            dye.tint -= value;
                          }
                          else if(slideStart < value){
                          dye.tint += value;
                          }
                          console.log(dye.tint, Math.round(value * 100) + '%');
                      });
    hairSlider.onDragStart.add(function (value) {
                           // This will be logged when the user clicks on the drag handle
                               slideStart = value;
                           console.log('Start dragging at ' + Math.round(value * 100) + '%');
                           });
    panel.add(new SlickUI.Element.Text(5, panel.height - 125, "Hair Color"))
    
    //Eye Color Slider
    panel.add(eyeSlider = new SlickUI.Element.Slider(16,175, panel.width - 32));
    eyeSlider.onDrag.add(function (value) {
                          // This will log the slider's value on a scale of 100 every time the user moves the drag handle
                         if(Math.round(value * 100) == 0 || Math.round(value * 100) == 100) {
                                //do nothing
                         }
                          else if(slideStart > value) {
                          eyeColor.tint -= value + 0.5;
                          }
                          else if(slideStart < value){
                          eyeColor.tint += value + 0.5;
                          }
                          console.log(eyeColor.tint, Math.round(value * 100) + '%');
                          });
    eyeSlider.onDragStart.add(function (value) {
                               // This will be logged when the user clicks on the drag handle
                               slideStart = value;
                               console.log('Start dragging at ' + Math.round(value * 100) + '%');
                               });
    panel.add(new SlickUI.Element.Text(5, panel.height - 55, "Eye Color"))
}

function update() {
	// run game loop
}

function saveWaifu() {
    var waifu = {
    skin: skinTone.tint,
    eyeColor: eyeColor.tint,
    eyeShape: eyeColor.frame,
    hairColor: dye.tint,
    hairStyle: dye.frame,
    mouth: expression.frame
    }
    savedWaifu = true;
    console.log(waifu);
}
function rerollWaifu() {
    console.log("rerolling");
    waifuGroup.removeAll(true);
    placeBody();
    placeEyes();
    placeHair();
    placeMouth();
}
/*function fuseWaifu() {
    if (savedWaifu == true) {
        console.log("can fuse");
        savedWaifu = false;
    }
    else {
        console.log("not can fuse");
    }
} */
function placeBody() {
    var shirt = game.add.sprite(-700, 0, 'shirt');
    waifuGroup.add(shirt);
    var peopleColors = [0x674d3c, 0xa2836e, 0xd9ad7c, 0xfff2df, 0xfbefcc, 0xffefd5, 0xe9d0af, 0xdeb887, 0xce954b]
    skinTone = game.add.sprite(-700,0,'body');
    skinTone.tint = Phaser.ArrayUtils.getRandomItem(peopleColors);
    waifuGroup.add(skinTone);
}
function placeEyes() {
    var n = game.rnd.integerInRange(0,3);
    eyeColor = game.add.sprite(130,275,'iris', n);
    eyeColor.tint = Math.random() * 0xffffff;
    waifuGroup.add(eyeColor);
    var eyes = game.add.sprite(130,275,'eyes', n);
    waifuGroup.add(eyes);
}
function placeHair() {
    n = game.rnd.integerInRange(0,8);
    dye = game.add.sprite(0,75,'dye', n);
    dye.tint = Math.random() * 0xffffff + 700;
    waifuGroup.add(dye);
    var hair = game.add.sprite(0,75,'hair', n);
    waifuGroup.add(hair);
}
function placeMouth() {
    n = game.rnd.integerInRange(0,4);
    expression = game.add.sprite(185,385,'mouth', n);
    waifuGroup.add(expression);
}
