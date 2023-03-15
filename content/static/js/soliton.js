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

let rogue_wave_3d_x = [];
let rogue_wave_3d_y = [];

(function() {
	let x_arr = seq(-15, 45.6, 0.6);
	let y_arr = seq(-15, 45.6, 0.6);
	for (let x of x_arr) {
		for (let y of y_arr) {
			rogue_wave_3d_x.push(x);
			rogue_wave_3d_y.push(y);
		} 
	} 
})()

const rogue_wave_3d = (iframe) => {
	let coordinates = [];
	for (let i=0; i<rogue_wave_3d_x.length; i++) {
		if (iframes[iframe][i] < 1 && random() < 0.6) continue;
		coordinates.push(rogue_wave_3d_x[i], rogue_wave_3d_y[i], iframes[iframe][i]);
	}
	return coordinates;
}

camera.position.set(0, 0, 70);

let points_arr = [];
const rogue_wave_3d_points_arr = () => {
	for (let i=0; i<iframes.length; i++) {
		let geometry = new THREE.BufferGeometry();
		let coordinates = rogue_wave_3d(i);
		let positionsArray = new Float32Array(coordinates);
		let positionAttribute = new THREE.BufferAttribute(positionsArray, 3); 
		geometry.setAttribute('position', positionAttribute);
		geometry.center();
		
		let material = new THREE.PointsMaterial( { color: 0x000000, size: 0.08} );
		points_arr.push( new THREE.Points( geometry, material ) );
	}
}
rogue_wave_3d_points_arr();

let count = 0;
setInterval( () => {
	while (scene.children.length > 0) {
		scene.remove(scene.children[0]);
	}
	count++;
	if (count > 50) count = 1;
	
	scene.add( points_arr[count] );
}, 100)

var controls = new THREE.TrackballControls(camera);
(function animate() {
	controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();