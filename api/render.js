const render = function render(template, vars) {
/*
 * Canibalized from
 *    https://www.npmjs.com/package/sprightly
 *    https://github.com/obadakhalili/Sprightly/blob/main/index.js
 */
   const regexp = /<<(.*?)>>|\{\{(.*?)\}\}/;
   return template.split('\n').map( function(line) {
       for (let match = line.match(regexp), result; match;) {
	   if (match[0][0] === '<') {
		   console.log("match <");
	   } else {
	      result = vars[match[2].trim()];

	   }
           line = line.replace(match[0], result ? result : '');
	   match = line.match(regexp);
       }	       
       return line;
   }).join('\n');	
}
module.exports = render;
