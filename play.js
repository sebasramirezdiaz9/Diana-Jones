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
    scene: {
        preload: preload,
        create: create,
        update: update
    },
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
};

var player;
var coins;
var bombs;
var platforms;
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

var game = new Phaser.Game(config);



function preload ()
{
    // Method for loading...
    loading = this.add.text(500, 500, 'Cargando..... ',{ fontSize: '32px', fill: '#ffffff' });
    //
    this.load.image('start_label', 'assets/start_label.png');
    this.load.image('game-over', 'assets/game-over.png');
    this.load.image('menu_pause_regresar', 'assets/volver_menu.png');
    this.load.image('menu_pause_continue', 'assets/menu_pause_continue.png');
    this.load.image('menu_pause', 'assets/menu_pause.jpg');
    this.load.image('sky', 'assets/bosque.png');    
    this.load.audio('bonus', 'assets/audio/Bonus.wav');
    this.load.audio('soundtrack', 'assets/audio/soundtrack.mp3');
    this.load.audio('hit_bomb', 'assets/audio/hit_bomb.mp3');
    this.load.audio('loser', 'assets/audio/loser.mp3');
    this.load.image('ground', 'assets/ground_grass.png');
    this.load.image('coin', 'assets/moneda.png');
    this.load.image('plataform', 'assets/platform.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/personaje1.png', { frameWidth: 49, frameHeight: 61 });
}

function create ()
{    
    //Destroy loading
    loading.destroy();
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
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
    scoreText = this.add.text(16, 16, 'Puntuacion: '+score, { fontSize: '32px', fill: '#000' });
    //  The lives
    livesText = this.add.text(310, 16, 'Vidas: '+lives, { fontSize: '32px', fill: '#000' });

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
      

}

function update ()
{
    if (band_music == true){
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

function collectCoin (player, coin)
{
    bonus.play();
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
        
  

    }
}

function hitBomb (player)
{
    if(invincible == false){
        hit_bomb.play();
        lives--;
        player.setTint(0xff0000);

        livesText.setText('Vidas: ' + lives);
        
        if (lives <= 0) {
            this.physics.pause();
            player.anims.play('turn');
            this.add.sprite(400, 300, 'game-over');
            //Text to play again
            play_again = this.add.text(450, 480, 'Jugar de nuevo', { font: '32px Arial', fill: '#000'});
            play_again.setInteractive().on('pointerdown', function() {
                window.location.href="./play.html";                         
            });
            //Sprite to return at principal menu
            menu_pause_regresar = this.add.sprite(200, 500, 'menu_pause_regresar');        
            menu_pause_regresar.setInteractive().on('pointerdown', function() {                                
                window.location.href="./index.html";            
             });
            gameOver = true;              
            music.stop();
            music2.play();
        }    

        invincible = true;
        this.time.delayedCall(1500, noDead);
    }
}

function noDead() {
    player.clearTint();
    invincible = false;
}

