const seq = (x0, x1, step) => new Array( Math.floor( (x1 - x0) / step ) ).join().split(',').map((a, i) => i * step + x0);
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const sech = x => 1 / Math.cosh(x);
const abs = Math.abs;
const random = Math.random;

// soliton
const soliton = () => {
	let coordinates = [];
	let x_arr = seq(-10, 10, 0.25);
	let t_arr = seq(-10, 10, 0.25);
	for (let x of x_arr) {
		for (let t of t_arr) {
			if (random() > 0.6) continue
			let z = 6 * sech(x + 0.1 * t)**2;
			coordinates.push(x, t, z);
		} 
	}
	return coordinates;
}

// rogue wave
const rogue_wave = () => {
	let coordinates = [];
	let x_arr = seq(-10, 10, 0.2);
	let t_arr = seq(-10, 10, 0.2);
	for (let x of x_arr) {
		for (let t of t_arr) {
			if (abs(x) > 3 || abs(t) > 3) {
				if (random() > 0.25) {
					continue
				}
			} else if (random() > 0.8) {
				continue
			}
			let re = (cos((1/2)*x)*(-16*t**2-x**2-4*sqrt(2)+2)-sin((1/2)*x)*(4*x*sqrt(2)-8*t-2*x))*(16*t**2+x**2+2)/((16*t**2+x**2+2)**2+(8*t-2*x)**2)+(sin((1/2)*x)*(-16*t**2-x**2-4*sqrt(2)+2)+cos((1/2)*x)*(4*x*sqrt(2)-8*t-2*x))*(8*t-2*x)/((16*t**2+x**2+2)**2+(8*t-2*x)**2);
			let im = ((sin((1/2)*x)*(-16*t**2-x**2-4*sqrt(2)+2)+cos((1/2)*x)*(4*x*sqrt(2)-8*t-2*x))*(16*t**2+x**2+2)/((16*t**2+x**2+2)**2+(8*t-2*x)**2)-(cos((1/2)*x)*(-16*t**2-x**2-4*sqrt(2)+2)-sin((1/2)*x)*(4*x*sqrt(2)-8*t-2*x))*(8*t-2*x)/((16*t**2+x**2+2)**2+(8*t-2*x)**2));
			let z = 10 * sqrt(re**2 + im**2);
			coordinates.push(x, t, z);
		} 
	} 
	return coordinates;
}

let geometry = new THREE.BufferGeometry();
let coordinates = random() > 0.5 ? soliton() : rogue_wave();
let positionsArray = new Float32Array(coordinates);
let positionAttribute = new THREE.BufferAttribute(positionsArray, 3); 
geometry.setAttribute('position', positionAttribute);
geometry.center();

let material = new THREE.PointsMaterial( { color: 0x000000, size: 0.08} );
let points = new THREE.Points( geometry, material );
scene.add( points );

camera.position.set(0, -30, 30);

var controls = new THREE.TrackballControls(camera);
(function animate() {
	controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();