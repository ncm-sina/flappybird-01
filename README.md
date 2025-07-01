**detailed readme.html** is located at /public_html/readme.html you should download the whole project or clone it and then once you run the project using xampp or similar tool (setting public_html as website root) then you can go to localhost/flappybird.com/readme.html

this project was a university project for course "game design and development".

the original plan was to make a game similar to https://flappybird.io/ but i took it upon myself to make it more challenging. Inspired by godot node based models i defined some classes for each object type used in 2d game development. each of the objects inherite from a super class. for example all objects inherite from a class called node and a class named sprite2d would inherite from node2d which inherites from node and so on.

each node has an array of childNodes which means a node like sprite2d could hold other game objects to make it more dynamic and complex. we would also defined our own custom complex classes like pipe2D which would take in custom parameters and in itself has multiple other game objects like multiple sprite2d or colliders and so on. after defining out custom complex game object we could use it like other basic game object by adding them into the childNode array of a parent game object.

this is in no way optimized or near being production ready. it was just a challenge for me.

enjoy
