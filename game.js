var player;
var playerSelected;
var coins;
var bombs;
var platforms;
var platforms2;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var livesText;
var pause_label;
var menu_pause;
var paused_status = 1;
var key_pause;
var lives = 5;
var gameOverImg;
var invincible = false;
var music;
var band_music = false;
var music2;
var bonus;
var hit_bomb;
var pause =  true;
var start_label;
var gameStart =  false;
var loading;
var menu_pause_regresar;
var level=false;
var level_fond=0;
var background;
var start;
var name = '';
var text;
var record;

var Scene2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Scene2 ()
    {
        Phaser.Scene.call(this, { key: 'Scene2', active: true });
    },

    preload: function()
    {
        this.load.html('nameform', './name.html');
        this.load.image('sky', 'assets/fondo.jpg');
        this.load.image('title','assets/name.png' );
        this.load.image('next','assets/siguiente.png' );

    },

    create: function()
    {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 200, 'title');
        var next = this.add.image(400,400,'next').setInteractive();
        /*this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });*/
    
        var element = this.add.dom(400, 0).createFromCache('nameform');
    
        next.on('pointerover', function () {
            this.setTint(0xcccccc);
            });
         next.on('pointerout', function () { 
                
             this.clearTint();
            
            
         });
        next.on('pointerdown', function(){
            var inputText = element.getChildByName('nameField');

            //  Have they entered anything?
            if (inputText.value !== '')
            {
                name = inputText.value;
            }
            else
            {
                name = "Anonimo"; 
                
            }
        });  
     
        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    },

    update: function()
    {
        if(name !== ''){
            this.scene.pause();
            this.scene.start("Scene1");
            
            
        }
    }

});
var Scene1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Scene1 ()
    {
        Phaser.Scene.call(this, { key: 'Scene1'});
    },

    preload: function ()
    {
        this.load.image('chosee', 'assets/chosee.png');
        this.load.image('sky', 'assets/fondo.jpg');
        this.load.image('icon', 'assets/icon.png');
        this.load.image('icon2', 'assets/icono2.png');
        this.load.image('exit', 'assets/salir.png');

    },

    create: function ()
    {
        this.add.image(400, 300, 'sky');
      
        this.add.image(400, 100, 'chosee');
        var icon2 = this.add.image(600,300,'icon2').setInteractive();
        
        icon2.on('pointerover', function () {
            this.setTint(0xcccccc);
    
         
            });
         icon2.on('pointerout', function () { 
                
             this.clearTint();
            
            
         });
        icon2.on('pointerdown', function(){
            playerSelected = 1;
            
            
        });  

        var icon = this.add.image(200,300,'icon').setInteractive();
        
        icon.on('pointerover', function () {
            this.setTint(0xcccccc);
    
         
            });
         icon.on('pointerout', function () { 
                
             this.clearTint();
            
            
         });
        icon.on('pointerdown', function(){
            playerSelected = 0;
            
            
        });  

        var exit = this.add.image(728,48,'exit').setInteractive();
        
        exit.on('pointerover', function () {
            this.setTint(0xcccccc);
    
         
            });
         exit.on('pointerout', function () { 
                
             this.clearTint();
            
            
         });
        exit.on('pointerdown', function(){
            location.assign("menu.html");
            
        });  

    },

    update: function (time, delta)
    {
        if(playerSelected == 1 || playerSelected == 0){
            this.scene.pause();
            this.scene.start("SceneA");
        }
    }

});
var sonido;
var sonido_true;
var sonido_false;
var button_sonido = true;
var band_sonido = true;

var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function  SceneA ()
    {
        Phaser.Scene.call(this, { key: 'SceneA'});
    },
    preload: function ()
    {
        loading = this.add.text(500, 500, 'Cargando..... ',{ fontSize: '32px', fill: '#ffffff' });
        //
        this.load.image('diamante', 'assets/diamante.png');
        this.load.image('sonido_true', 'assets/sonido_true.png');
        this.load.image('sonido_false', 'assets/sonido_false.png');
        this.load.image('start_label', 'assets/level1.png');
        this.load.image('game-over', 'assets/game-over.png');
        this.load.image('new-game', 'assets/new-game.png');
        this.load.image('menu_pause_regresar', 'assets/menu.png');
        this.load.image('menu_pause_continue', 'assets/menu_pause_continue.png');
        this.load.image('menu_pause', 'assets/menu_pause.jpg');
        this.load.image('sky2', 'assets/bosque.png'); 
        this.load.image('level2', 'assets/sky.png'); 
        this.load.audio('bonus', 'assets/audio/Bonus.wav');
        this.load.audio('soundtrack', 'assets/audio/soundtrack.mp3');
        this.load.audio('hit_bomb', 'assets/audio/hit_bomb.mp3');
        this.load.audio('loser', 'assets/audio/loser.mp3');
        this.load.image('ground', 'assets/ground_grass.png');
        this.load.image('coin', 'assets/moneda.png');
        this.load.image('plataform', 'assets/platform.png');
        this.load.image('bomb', 'assets/bomb.png');
        if(playerSelected == 0)
        {
            this.load.spritesheet('dude', 'assets/personaje2.png', { frameWidth: 54, frameHeight: 48 });
        }
        if(playerSelected == 1)
        {
            this.load.spritesheet('dude', 'assets/personaje1.png', { frameWidth: 49, frameHeight: 61 });
        }
    },

    create: function ()
    {
        //Destroy loading
        loading.destroy();
        
        
    //  The platforms group contains the ground and the 2 ledges we can jump on
        background= this.add.image(400, 300, 'sky2');
        platforms = this.physics.add.staticGroup();
        
        //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'plataform').setScale(3).refreshBody();
      //  Now let's create some ledges
      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');
       // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
     //  Our player animations, turning, walking left and walking right.
     this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

     //  Input Events
     cursors = this.input.keyboard.createCursorKeys();

     //  Some coins to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
     coins = this.physics.add.group({
         key: 'coin',
         repeat: 11,
         setXY: { x: 12, y: 0, stepX: 70 }
     });
     
     coins.children.iterate(function (child) {
 
         //  Give each coin a slightly different bounce
         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
 
     });     

     bombs = this.physics.add.group();

     //  The score
     scoreText = this.add.text(16, 550, 'Score: '+score, { fontSize: '20px', fill: '#FFF' });
     if(scoreText==240){
        this.scene.start("SceneB");
        
    }
     //  The lives
     livesText = this.add.text(220, 550, 'Vidas: '+lives, { fontSize: '20px', fill: '#FFF' });
     this.add.text(350, 550, 'Nivel: 1', { fontSize: '20px', fill: '#FFF' });

     this.add.text(500, 550, 'Jugador:'+name, { fontSize: '20px', fill: '#FFF' });
 
     //  Collide the player and the coin with the platforms
     this.physics.add.collider(player, platforms);
     this.physics.add.collider(coins, platforms);
     this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the coins, if he does call the collectCoins function
        
    this.physics.add.overlap(player, coins, collectCoin, null, this);
  
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    

    this.physics.pause();   

    //Start pause method with button in display
    pause_label = this.add.text(700, 20, 'Pause', { font: '24px Arial', fill: '#fff'});
    pause_label.setInteractive().on('pointerdown', function () {
        // When the paus button is pressed, we pause the game
        this.scene.physics.world.pause();
        pause = true;
        band_music = false;
        music.pause();
        // Then add the menu
        if(gameOver == false && gameStart == true){
            menu_pause = this.scene.add.sprite(400, 300, 'menu_pause');
            menu_pause_continue = this.scene.add.sprite(400, 350, 'menu_pause_continue');
            menu_pause_regresar = this.scene.add.sprite(400, 250, 'menu_pause_regresar');

            menu_pause_continue.setInteractive().on('pointerdown', function() {
                menu_pause.destroy();
                menu_pause_continue.destroy();
                menu_pause_regresar.destroy();
                band_music = true;
                paused_status = 0;            
            });
        
            menu_pause_regresar.setInteractive().on('pointerdown', function() {                
                gameOver = true;
                window.location.href="./index.html";            
            });
        }
    });
    //End pause method
    var configSound = {
        mute: false,
        volume: 2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    music = this.sound.add('soundtrack', configSound);
    var configSound2 = {
        mute: false,
        volume: 2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    music2 = this.sound.add('loser', configSound2);
    var configSound3 = {
        mute: false,
        volume: 2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    bonus = this.sound.add('bonus', configSound3);
    var configSound4 = {
        mute: false,
        volume: 3,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    hit_bomb = this.sound.add('hit_bomb', configSound4);

   

    start_label = this.add.sprite(400, 300, 'start_label');
    start_label.setInteractive().on('pointerdown', function() {
        this.scene.physics.world.pause();   
        start_label.destroy();
        band_music = true;
        gameStart = true;
        pause = false;
        paused_status = 0;            
    });
    
    sonido = this.add.image(750, 555, 'sonido_false');
    sonido.setInteractive().on('pointerdown', function(){
        if(gameStart == true && pause == false){
            if(band_sonido == true){
                if(sonido_false != null){
                    sonido_false.destroy();
                }
                sonido_true = this.scene.add.sprite(750, 555, 'sonido_true');
                band_sonido = false;
                band_music =  true;
            }else if(band_sonido == false){
                if(sonido_true != null){
                    sonido_true.destroy();
                }
                sonido_false = this.scene.add.sprite(750, 555, 'sonido_false');
                band_sonido = true;
                button_sonido = false;
                band_music = false;
            }      
        }
    });
    },

    update: function ()
    {
        if(button_sonido == false){
            music.pause();
            button_sonido = true;
            band_sonido = true;
        }

        if (band_music == true && button_sonido == true && band_sonido == false){
            music.play();
            band_music = false;
        }
    
        if(paused_status == 0){
            paused_status = 1;
            pause = false;
            this.physics.resume();
        }
    
        if (gameOver)
        {
            return;
        }
    
        if (cursors.left.isDown && pause == false)
        {       
            player.setVelocityX(-160);
    
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown && pause == false)
        {
            player.setVelocityX(160);
    
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
    
            player.anims.play('turn');
        }
    
        if (cursors.up.isDown && player.body.touching.down && pause == false)
        {
            player.setVelocityY(-330);
        }

        //call the scene the leve 2
        if(level==true){
            
            music.pause();
            this.scene.pause();
            this.scene.launch('SceneB');
            
            
        }
    }

});


function collectCoin (player, coin)
{
    if (band_sonido == false){
        bonus.play();
    }
    coin.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);    

    if (coins.countActive(true) === 0)
    {        
        //  A new batch of coins to collect
        coins.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
         
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

        if((score/150) >= 1){
            diamante = this.physics.add.sprite(x, 16, 'diamante');
            this.physics.add.collider(diamante, platforms);
            this.physics.add.overlap(player, diamante, collectBonus, null, this);
        }

        //repite the level 1
    if(score>400){
        level=true;
    }
    }
    
} 

function collectBonus(){
    if (band_sonido == false){
        bonus.play();
    }
    diamante.disableBody(true, true);

    //  Add and update the score
    score += 35;
    scoreText.setText('Score: ' + score); 
}


function hitBomb (player)
{
    if(invincible == false){   
        if(diamante != null){
            diamante.disableBody(true, true);
        }   

        if (band_sonido == false){
         hit_bomb.play();
        }
        lives--;
        player.setTint(0xff0000);

        livesText.setText('Vidas: ' + lives);
        
        if (lives <= 0) {
            this.physics.pause();
            player.anims.play('turn');
            this.add.sprite(400, 300, 'game-over');
            //Text to play again
            play_again = this.add.image(600, 500, 'new-game');
            play_again.setInteractive().on('pointerdown', function() {
                window.location.href="./play.html";                         
            });
            //Sprite to return at principal menu
            menu_pause_regresar = this.add.sprite(200, 500, 'menu_pause_regresar');        
            menu_pause_regresar.setInteractive().on('pointerdown', function() {                                
                window.location.href="./menu.html";            
             });
            gameOver = true;              
            music.stop();
            music2.play();
            var records = localStorage.getItem("records");
            records = JSON.parse(records);

            if(records == null)
            {
                records = [];
            }

            record = JSON.stringify({
                name:name,
                score:score
            });

            records.push(record);
            localStorage.setItem("records", JSON.stringify(records));
            }    
            if(band_sonido == false){
                music.play();
            } 
        }    

        invincible = true;
        this.time.delayedCall(1500, noDead);
}

function noDead() {
    player.clearTint();
    invincible = false;
}

var SceneB = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function  SceneB ()
    {
        Phaser.Scene.call(this, { key: 'SceneB'});
    },
    preload: function ()
    {
        loading = this.add.text(500, 500, 'Cargando..... ',{ fontSize: '32px', fill: '#ffffff' });
        //
        this.load.image('diamante', 'assets/diamante.png');
        this.load.image('sonido_true', 'assets/sonido_true.png');
        this.load.image('sonido_false', 'assets/sonido_false.png');
        this.load.image('start', 'assets/level2.png');
        this.load.image('game-over', 'assets/game-over.png');
        this.load.image('menu_pause_regresar', 'assets/menu.png');
        this.load.image('new-game', 'assets/new-game.png');
        this.load.image('menu_pause_continue', 'assets/menu_pause_continue.png');
        this.load.image('menu_pause', 'assets/menu_pause.jpg');
        this.load.image('fondo', 'assets/fondo-level2.png');
        this.load.audio('bonus', 'assets/audio/Bonus.wav');
        this.load.audio('soundtrack', 'assets/audio/soundtrack.mp3');
        this.load.audio('hit_bomb', 'assets/audio/hit_bomb.mp3');
        this.load.audio('loser', 'assets/audio/loser.mp3');
        this.load.image('coin', 'assets/moneda.png');
        this.load.image('ground2', 'assets/ground_wood.png');
        this.load.image('plataform', 'assets/platform.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/personaje1.png', { frameWidth: 49, frameHeight: 61 });
    },

    create: function ()
    {
        //Destroy loading
        loading.destroy();
  
        
    //  The platforms group contains the ground and the 2 ledges we can jump on
        this.add.image(400, 300, 'fondo');
        platforms2 = this.physics.add.staticGroup();
        
        //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms2.create(400, 568, 'plataform').setScale(3).refreshBody();
      //  Now let's create some ledges
      platforms2.create(600, 400, 'ground2');
      platforms2.create(20, 180, 'ground2');
      platforms2.create(700, 220, 'ground2');
      platforms2.create(100, 350, 'ground2');
       // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
     //  Our player animations, turning, walking left and walking right.
     this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

     //  Input Events
     cursors = this.input.keyboard.createCursorKeys();

     //  Some coins to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
     coins = this.physics.add.group({
         key: 'coin',
         repeat: 11,
         setXY: { x: 12, y: 0, stepX: 70 }
     });
 
     coins.children.iterate(function (child) {
 
         //  Give each coin a slightly different bounce
         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
 
     });
     bombs = this.physics.add.group();
     //  The score
     scoreText = this.add.text(16, 550, 'Puntuacion: '+score, { fontSize: '20px', fill: '#FFF' });
     this.add.text(400, 550, 'Nivel 2', { fontSize: '20px', fill: '#FFF' });
     //  The lives
     livesText = this.add.text(250, 550, 'Vidas: '+lives, { fontSize: '20px', fill: '#FFF' });
    
     this.add.text(500, 550, 'Jugador:'+name, { fontSize: '20px', fill: '#FFF' });

     //  Collide the player and the coin with the platforms
     this.physics.add.collider(player, platforms2);
     this.physics.add.collider(coins, platforms2);
     this.physics.add.collider(bombs, platforms2);

        //  Checks to see if the player overlaps with any of the coins, if he does call the collectCoins function
    this.physics.add.overlap(player, coins, collectCoin_leve2, null, this);
    

    this.physics.add.collider(player, bombs, hitBomb2, null, this);

    this.physics.pause();   

    //Start pause method with button in display
    pause_label = this.add.text(700, 20, 'Pause', { font: '24px Arial', fill: '#fff'});
    pause_label.setInteractive().on('pointerdown', function () {
        // When the paus button is pressed, we pause the game
        this.scene.physics.world.pause();
        pause = true;
        band_music = false;
        music.pause();
        // Then add the menu
        if(gameOver == false && gameStart == true){
            menu_pause = this.scene.add.sprite(400, 300, 'menu_pause');
            menu_pause_continue = this.scene.add.sprite(400, 350, 'menu_pause_continue');
            menu_pause_regresar = this.scene.add.sprite(400, 250, 'menu_pause_regresar');

            menu_pause_continue.setInteractive().on('pointerdown', function() {
                menu_pause.destroy();
                menu_pause_continue.destroy();
                menu_pause_regresar.destroy();
                band_music = true;
                paused_status = 0;            
            });
        
            menu_pause_regresar.setInteractive().on('pointerdown', function() {                
                gameOver = true;
                window.location.href="./index.html";            
            });
        }
    });
    //End pause method
    var configSound = {
        mute: false,
        volume: 2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    music = this.sound.add('soundtrack', configSound);
    var configSound2 = {
        mute: false,
        volume: 2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    music2 = this.sound.add('loser', configSound2);
    var configSound3 = {
        mute: false,
        volume: 2,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    bonus = this.sound.add('bonus', configSound3);
    var configSound4 = {
        mute: false,
        volume: 3,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    hit_bomb = this.sound.add('hit_bomb', configSound4);

    start = this.add.sprite(400, 300, 'start');
    start.setInteractive().on('pointerdown', function() {
        this.scene.physics.world.pause();   
        start.destroy();
        band_music = true;
        gameStart = true;
        pause = false;
        paused_status = 0;            
    });

    sonido = this.add.image(750, 555, 'sonido_false');
    sonido.setInteractive().on('pointerdown', function(){
        if(gameStart == true && pause == false){
            if(band_sonido == true){
                if(sonido_false != null){
                    sonido_false.destroy();
                }
                sonido_true = this.scene.add.sprite(750, 555, 'sonido_true');
                band_sonido = false;
                band_music =  true;
            }else if(band_sonido == false){
                if(sonido_true != null){
                    sonido_true.destroy();
                }
                sonido_false = this.scene.add.sprite(750, 555, 'sonido_false');
                band_sonido = true;
                button_sonido = false;
                band_music = false;
            }      
        }
    });
        
    },

    update: function ()
    {
        if(button_sonido == false){
            music.pause();
            button_sonido = true;
            band_sonido = true;
        }

        if (band_music == true && button_sonido == true && band_sonido == false){
            music.play();
            band_music = false;
        }

        if(paused_status == 0){
            paused_status = 1;
            pause = false;
            this.physics.resume();
        }
    
        if (gameOver)
        {
            return;
        }
    
        if (cursors.left.isDown && pause == false)
        {       
            player.setVelocityX(-160);
    
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown && pause == false)
        {
            player.setVelocityX(160);
    
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
    
            player.anims.play('turn');
        }
    
        if (cursors.up.isDown && player.body.touching.down && pause == false)
        {
            player.setVelocityY(-330);
        }
    }

});
function collectCoin_leve2 (player, coin)
{
    if (band_sonido == false){
        bonus.play();
    }
    coin.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);    

    if (coins.countActive(true) === 0)

    {
        //  A new batch of coins to collect
        coins.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
            level++;
    });

        
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

        if((score/150) >= 1){
            diamante = this.physics.add.sprite(x, 16, 'diamante');
            this.physics.add.collider(diamante, platforms2);
            this.physics.add.overlap(player, diamante, collectBonus2, null, this);
        }
    }
}


function collectBonus2(){
    if (band_sonido == false){
        bonus.play();
    }
    diamante.disableBody(true, true);

    //  Add and update the score
    score += 35;
    scoreText.setText('Score: ' + score); 
}

function hitBomb2 (player)
{
    if(invincible == false){
        if(diamante != null){
            diamante.disableBody(true, true);
        }  
        if (band_sonido == false){
            hit_bomb.play();
        }
        lives--;
        player.setTint(0xff0000);

        livesText.setText('Vidas: ' + lives);
        
        if (lives <= 0) {
            this.physics.pause();
            player.anims.play('turn');
            this.add.sprite(400, 300, 'game-over');
            //Text to play again
            play_again = this.add.image(600, 500, 'new-game');
            play_again.setInteractive().on('pointerdown', function() {
                window.location.href="./play.html";                         
            });
            //Sprite to return at principal menu
            menu_pause_regresar = this.add.sprite(200, 500, 'menu_pause_regresar');        
            menu_pause_regresar.setInteractive().on('pointerdown', function() {                                
                window.location.href="./menu.html";            
             });
            gameOver = true;              
            music.stop();
            if(band_sonido == false){
                music2.play();
            }            
        }    

        invincible = true;
        this.time.delayedCall(1500, noDead);
    }
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Scene2, Scene1, SceneA, SceneB],
    input:{
        keyboard: {
            target: window
        },
        mouse: {
            target: null,
            capture: true
        },
        activePointers: 1,
        touch: {
            target: null,
            capture: true
        },
        smoothFactor: 0,
        gamepad: false,
        windowEvents: true,
    },    
    parent: 'phaser-example',
    backgroundColor: '#222288',
    dom: {
        createContainer: true
    },
};



var game = new Phaser.Game(config);