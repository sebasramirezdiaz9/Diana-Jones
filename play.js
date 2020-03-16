var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
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
    }
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

var game = new Phaser.Game(config);



function preload ()
{
    this.load.image('game-over', 'assets/game-over.png')
    this.load.image('menu_pause_continue', 'assets/menu_pause_continue.png');
    this.load.image('menu_pause', 'assets/menu_pause.jpg');
    this.load.image('sky', 'assets/bosque.png');
    this.load.audio('Bonus', 'assets/Bonus.wav')
    this.load.image('ground', 'assets/ground_grass.png');
    this.load.image('coin', 'assets/moneda.png');
    this.load.image('plataform', 'assets/platform.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/personaje2.png', { frameWidth: 54, frameHeight: 48 });
}

function create ()
{
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

    //Start pause method with button in display
    pause_label = this.add.text(700, 20, 'Pause', { font: '24px Arial', fill: '#fff'});
    pause_label.setInteractive().on('pointerdown', function () {
        // When the paus button is pressed, we pause the game
        this.scene.physics.world.pause();

        // Then add the menu
        menu_pause = this.scene.add.sprite(400, 300, 'menu_pause');
        menu_pause_continue = this.scene.add.sprite(400, 500, 'menu_pause_continue');

        menu_pause_continue.setInteractive().on('pointerdown', function() {
            menu_pause.destroy();
            menu_pause_continue.destroy();
            paused_status = 0;            
        });
    });
    //End pause method
}

function update ()
{
    if(paused_status == 0){
        paused_status = 1;
        this.physics.resume();
    }

    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function collectCoin (player, coin)
{
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
        lives--;
        player.setTint(0xff0000);

        livesText.setText('Vidas: ' + lives);

        if (lives <= 0) {
            this.physics.pause();
            player.anims.play('turn');
            this.add.sprite(400, 300, 'game-over');
            gameOver = true;
        }    

        invincible = true;
        this.time.delayedCall(1500, noDead);
    }
}

function noDead() {
    player.clearTint();
    invincible = false;
}

