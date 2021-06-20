
export const drawRect = (detections, ctx) =>{
    // Loop through each prediction
    detections.forEach(prediction => {
  
      // Extract boxes and classes
      const [x, y, width, height] = prediction['bbox']; 
      const text = prediction['class']; 
  
      // Set styling
      ctx.strokeStyle = 'black'
      ctx.font = '30px Arial';
  
      // Draw rectangles and text
      ctx.beginPath();   
      ctx.fillStyle = 'black'
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height); 
      ctx.stroke();
    });
  }