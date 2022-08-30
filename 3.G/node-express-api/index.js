//Hent biblioteket ip
const ip = require('ip')
console.log(ip.address())

//Hent bilbioteket express, og gem objektet som en konstant
const express = require('express')

//Opret en variabel til express servere
const app = express()

//Definer en port
const port = 1806

//Vi laver en meget simpel database
const marioTitles = {
    "mariotitles":
    'Here are some of the most popular Mario titles: Super Mario Bros. -1985 | Super Mario 64 -1996 | Mario Kart 64 -1997 | Super Mario Galaxy -2007 | Super Mario Odyssey -2017 // If you want to learn more about one of the games, try typing the game title in the url as the endpoint. Ex: "/Mario Kart 64"',

    "Super Mario Bros.": 
    'Super Mario Bros., sometimes referred to as Mario or SMB is a video game released by Nintendo for arcades in 1985, and again in late 1985 for the Nintendo Entertainment System. It made a huge impact on home entertainment when it was released, and is now considered a classic of the medium. Super Mario Bros. featured bright, expansive worlds that changed the way video games were created. Although often wrongly credited as the first scrolling platform game (there are at least a half dozen earlier), it is the first console original in this genre to feature smooth-scrolling levels, which made it a landmark in home video-gaming, and it is considered by a number of critics as one of the best games ever. Super Mario Bros. is listed in Guinness Book of World Records as the best-selling video game of all time, and was largely responsible for the initial success of the Nintendo Entertainment System, as well as ending the two year slump of video game sales in the United States after the video game crash of 1983. It has inspired countless imitators and was one of Shigeru Miyamot`s most influential early successes. The game starred the Italian plumber Mario and his slightly younger twin brother Luigi. Mario went on to become Nintendo`s most well known mascot. The theme music, by Koji Kondo, is recognized world wide, even by those who have not played the game. The game was succeeded by a direct sequel in Japan (later retitled Super Mario Bros.: The Lost Levels outside Japan), and by Super Mario Bros. 2, a slight revision of Yume Kōjō: Doki Doki Panic with playable Mario characters, elsewhere in the world. There is also another sequel called Super Mario Bros. Special released around the same time as the original sequel, but is was released only in Japan by Hudson Soft, so it was relatively obscure.',

    "Super Mario 64":
    'Super Mario 64 is a 1996 3-D action adventure platformer game released for the Nintendo 64. It was first released in Japan on June 23, 1996 and subsequently released in the U.S. on September 26, 1996, and in Europe and Australia on March 1, 1997. This game was one of two (three in Japan) launch titles for the Nintendo 64, along with PilotWings 64, which has helped drive initial sales of the console. As of January 7, 2017, it has sold nearly over 11 million copies worldwide, and is marked as the best selling Nintendo 64 game ever of all time. It is also the second most popular game on the Wii`s Virtual Console, after Super Mario Bros.. The game is actually the second three dimensional game starring Mario, the first one being Mario Clash. In this game, Mario is found on his way at a party at Princess Peach`s Castle. Unfortunately, King Bowser has taken over the castle and stole all of the Star Power Stars for himself. Now, it`s up to Mario to get all of them back and rescue Princess Peach. Super Mario 64 was originally in development for the Super Famicom, (and the 16-bit era of the SNES outside of Japan), but was moved to the Nintendo 64 after system limitations have proved very hassling and the ending era of the SNES began closing[4], not to mention a lack of proper controls (as the game defined the design of the N64 controller. Though it was not the first 3-D platforming game, it revolutionized the genre, with many games soon following its formula using it as a sort of benchmark. It is widely acclaimed as one of the greatest and most important games of all time. Being the first 3D Mario game , Super Mario 64 has introduced many moves that would be used in almost every later Super Mario title: Triple Jumping, Ground Pounding, Long Jumping, Diving, and Somersaults. Punching, and Kicking were also introduced, but would not be used in any of the later main titles (besides its Nintendo DS remake). Though not the first 3-D platforming game, Super Mario 64 codified many of the controls and designs conventions of the genre. It is widely acclaimed as one of the greatest and most important games of all time.'
    
    + 'In 1996, there was a Nintendo 64DD disk version of the game shown at Shoshinkai 1996. In 2004, an enhanced remake of Super Mario 64 was released for the Nintendo DS entitled Super Mario 64 DS in 2004. The remake had various differences from the original game such as Yoshi, Luigi, and Wario becoming as playable characters. There was also a sequel called Super Mario 64 2 planned for the Nintendo 64DD in 1999, but the game became cancelled, due to the 64DD`s commercial failure. Super Mario 64 was re-released digitally on the Wii`s Virtual Console service on November 19, 2006, and again on the Wii U`s Virtual Console service on April 1, 2015, making it and Donkey Kong 64 the first two Nintendo 64 games to be released on the Wii U. Contrary to the popular belief, this game was technically not the debut of Charles Martinet as Mario`s voice (it actually debuted in the 1995 PC game Mario game Mario`s FUNdamentals). It was, however, the first time that most people have heard of it, and thus regarded as its effective debut.',

    "Mario Kart 64":
    'Mario Kart 64 is a racing game developed and published by Nintendo for the Nintendo 64. It was released in 1996 in Japan and in 1997 in North America and Europe. On January 26, 2007, Mario Kart 64 was released on Nintendo`s European Virtual Console service for the Wii. It was also released on the American service on January 29, 2007 and in Japan on January 30, 2007. Mario Kart 64 is the sequel to Super Mario Kart for the Super Nintendo Entertainment System. Changes from the original include the move to 3D computer graphics and the inclusion of four player support. Players take control of characters from the Mario universe, who race around a variety of tracks with items that can either harm an opponent or aid the user. The move to three dimensional graphics allowed for track features not possible with the original game`s Mode 7 graphics, such as changes in elevation, bridges, walls and pits. However, the characters and items remained 2D pre-rendered sprites. Music for the game was composed by Kenta Nagata. The introduction music for Mario Kart 64, which is loosely based on the original Super Mario Kart theme tune, was remixed and used in the music video game Dance Dance Revolution: Mario Mix for the Nintendo GameCube. The game was one of the best sellers and had sold millions of copies.',

    "Super Mario Galaxy":
    'Super Mario Galaxy is an award-winning 3D platform game developed by Nintendo EAD Tokyo and published by Nintendo for the Wii. It was released in Japan on November 1, 2007, the United States on November 12, 2007, Canada on November 14, 2007, Europe on November 16, 2007, Australasia on November 27, 2007 and South Korea on September 4, 2008. It is the third 3D platformer in the Mario series, after Super Mario 64 and Super Mario Sunshine. The game follows the protagonist, Mario, on a quest to rescue Princess Peach from the game`s primary antagonist, Bowser. Levels are galaxies filled with minor planets and worlds, while gameplay is updated with gravity effects and new power-ups. Super Mario Galaxy was first shown at E3 2006 and enjoyed a high level of pre-release awareness. The game is one of the most critically acclaimed titles of all time, and has won numerous "Game of the Year" awards including a BAFTA.',

    "Super Mario Odyssey":
    'Super Mario Odyssey (スーパーマリオオデッセイ, Super Mario Odyssey) is a platforming game for the Nintendo Switch, it is the nineteenth title in the Super Mario series, the seventh original 3D Mario game and the eighth 3D Mario title overall. It was released internationally on October 27, 2017, in South Korea and Taiwan on December 2, 2017 and in China on March 16, 2020. The game won the Game of the Year award at the National Academy of Video Game Trade Reviewers Awards (where it also won the other categories it was nominated for, except for Control Precision, which was won by Cuphead) and was also nominated for the Game of the Year award at the Game Awards 2017 and it lost to The Legend of Zelda: Breath of The Wild, despite that, it won Best Family Game at the aforementioned ceremony.'
}

//Når der kommer besøg
app.get('/*', (req, res)=>{
    console.log('Serveren fik besøg i roden')
    if(req.params[0]){
        console.log('WOW! Nogen vil bruge vorse API: ' + req.params[0])
        if(marioTitles[req.params[0]]){
            res.send(marioTitles[req.params[0]])
        }
        else{
            res.send(req.params[0] + ' is NOT an API endpoint')
        }
    }else{
        res.send('Welcome to the localhost-server! Try typing "/mariotitles" in the url as the endpoint to recieve some data')
    }
})

//Start en webserver på porten
app.listen(1806, ()=>{
    console.log('Webserver kører')
})
