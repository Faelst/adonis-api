# Mars Rover Adonis API application

## How to run the project:

```
1. Clone the project
2. Run the command: docker-compose up -d
3. create a .env file in the root with same variables of .env.example
4. run the command: npm install
5. run the command: adonis key:generate
6. Run the command: adonis migration:run
7. Run the command: adonis seed
8. Run the command: adonis serve --dev
```

## View endpoints in the browser:

```
http://localhost:3333/ => Login router
http://localhost:3333/logs => Rover Logs router
```

## How to send rover commands:

1. You need get TOKEN

```bash
curl --request POST \
  --url http://127.0.0.1:3333/authenticate \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user@test.com",
	"password": "12345"
  }'
```

2. Set TOKEN in header and send commands

```bash
curl --request POST \
  --url http://127.0.0.1:3333/rover/send-commands \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data
  '{
	  "coordinates": {
		  "x": 0,
		  "y": 0,
		  "direction": "N"
	  },
	  "instructions": ""
   }'
```

## Exercise Test:

```
Mars Rover in JavaScript

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover , NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y 1).

Input
The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover’s position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover’s orientation.

Each rover will be finished sequentially, which means that the second rover won’t start to move until the first one has finished moving.

Output
The output for each rover should be its final co-ordinates and heading.

Rover Data Example
Example 1
Landing Position: 1 2 N
Instruction: LMLMLMLMM
Final Position: 1 3 N

Example 2
Landing Position: 3 3 E
Instruction: MRRMMRMRRM
Final Position: 2 3 S

What we Expect
The application should allow the user to interact with it to define the plateau size and the rover data.

We will evaluate your code structure, readability, organization, clean code, and of course if the application works as expected.
```
