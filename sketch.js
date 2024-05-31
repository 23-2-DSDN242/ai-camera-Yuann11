let sourceImg = null;
let maskImg = null;
let renderCounter = 0;


let sourceFile = "input_6.jpg";
let maskFile = "mask_6.png";
let outputFile = "output_6.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup() {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  // imageMode(CENTER);
  background(0);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}
 // Sets resolution of the grid
 let gridsize = 10

 // Sets size of the ellipse
 let circsize = 2

 // Sets stroke weight of the grid where the mask is Black
 let gridWeightB = .05

 // Sets stroke weight of the grid where the mask is white
 let gridWeightW = .5

 // Determines the strength of parallax
 let paraStrength = 5
function draw() {

 

  // Defines a singular pixel
 

  // Draws the pixel in the grid
  for (var y = 0; y < sourceImg.height; y = y + gridsize) {
    for (var x = 0; x < sourceImg.width; x = x + gridsize) {

      // Defines the colour of a given pixel of the input image
      let pix = sourceImg.get(x, y)

      // Defines the colour of a given pixel of the mask image
      let mask = maskImg.get(x, y);

      // If the mask is black...
      if (mask[0] >200) {

        // Sets the pixel to draw with only a stroke and in the colour of the input image
        fill(0,0,155)
        strokeWeight(gridWeightB)
        stroke(pix)

        // Draws the pixel
        draw_Pixel(x,y)

        // Sets the ellipse to draw with only a fill and in the colour of the input image
        noStroke()
        fill(pix)

        // Draws the ellipse at each vertice of the pixel
        ellipse(x + (960 - x) / (pix[0] / 5), y + (640 - y) / (pix[0] / 5), circsize, circsize)

        // If the mask is not black...
      } else {

        // Sets the pixel to draw with a black stroke and with a fill in the colour of the input image
        fill(pix)
        strokeWeight(gridWeightW)
        stroke(0)

        // Draws the pixel
        draw_Pixel(x,y)

        // Sets the ellipse to draw with a black fill and no stroke
        noStroke()
        fill(0)

        // Draws the ellipse at each vertice of the pixel
        ellipse(x + (960 - x) / (pix[0] / 5), y + (640 - y) / (pix[0] / 5), circsize, circsize)
      }
    }
  }
  renderCounter = renderCounter + 1;
  if (renderCounter > 15) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    //saveArtworkImage(outputFile);
  }
}
function draw_Pixel(x,y) {

  // Defines the centre of the image

 push ()
  
  beginShape()
  pix = sourceImg.get(x, y)
  vertex(x+random (-5,5)  , y +random (-5,5) )
  pix = sourceImg.get(x + gridsize, y)
  vertex(x + gridsize +random (-5,5), y +random (-5,5) )
  pix = sourceImg.get(x + gridsize, y + gridsize)
  vertex(x + gridsize+random (-5,5) , y + gridsize +random (-5,5) )
  pix = sourceImg.get(x, y + gridsize)
  vertex(x +random (-5,5) , y + gridsize +random (-5,5) )
  endShape(CLOSE)

  pop ()
}
function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}