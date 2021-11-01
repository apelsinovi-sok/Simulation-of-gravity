const time = 20
function setup() 
{
  createCanvas(600, 600);

  sun = new astronomical_object(19000, 30, createVector(0, 0), createVector(0, 0))
  let r = random(sun.radius, 250)
  let theta = random(TWO_PI)
  theta = PI/2
  r = 250

  let v = sqrt(1 * (20000 / r) / time) 
  let v2 = sqrt(1 * (10000 / 20) / time) 
  console.log(v)
  let x = cos(theta) * v
  let y = sin(theta) * v
  console.log(x,y)

  planet_1 = new astronomical_object(10000, 5, createVector(r * cos(theta), r * sin(theta)), createVector(v, 0))

  planet_2 = new astronomical_object(2, 2, createVector((r * cos(theta)), 20 + (r * sin(theta))), createVector(v2 , 0))

  // planet_1 = new astronomical_object(2, 4, createVector(30, 298), createVector(2,3))

}

function draw() 
{
  frameRate(30)
  translate(600/2,600/2)
  background('grey');
  sun.gravity(planet_1)
  sun.gravity(planet_2)
  // planet_1.gravity(sun)
  planet_1.gravity(planet_2)

  planet_1.show()
  planet_1.info()
  planet_2.show()
  sun.show()
}

function astronomical_object (mass,radius, position, speed) 
{
  this.mass = mass
  this.radius = radius 
  this.position = position
  this.speed = speed
  this.bool = true
  let force 
  let acceleration 
  let r
  
  this.gravity = function (child)
  {
    child.r = dist(position.x, position.y, child.position.x, child.position.y)
    if(child.r>this.radius){
    let sin = (position.y - child.position.y) / child.r
    let cos = (position.x - child.position.x) / child.r
    child.force = 1 * (this.mass * child.mass / (child.r*child.r))
    child.acceleration = (child.force / child.mass) 

    child.speed.x += (cos * child.acceleration) / time
    child.speed.y += (sin * child.acceleration) / time
    // console.log(child.speed.x , child.speed.y , child.position.x, child.position.y)
    child.position.x += child.speed.x 
    child.position.y += child.speed.y 
    }
  }
  
  this.show = function () 
  {
    noStroke()
    ellipse(position.x, position.y, radius*2, radius*2)
  }


  this.info = function () 
  {
    let speed_x = this.speed.x.toFixed(3)
    let speed_y = this.speed.y.toFixed(3)
    let speed = sqrt(speed_x ** 2 + speed_y ** 2).toFixed(3)
    let force = this.force.toFixed(3)
    let acceleration = this.acceleration.toFixed(3)
    let r = (this.r - this.radius).toFixed(3)
    textSize(15);
    text("Скорость по X: " + speed_x, -290, -280)
    text("Скорость по Y: " + speed_y, -290, -260)
    text("Скорость планеты: " +  speed, -290, -240)
    text("Сила F: " +  force, -290, -220)
    text("Ускорение a: " + acceleration, -290, -200)
    text("Расстояние до звезды: " + r, -290, -180)
  }
  
}

