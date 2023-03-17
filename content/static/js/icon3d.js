// Ref: https://www.cnblogs.com/yilei-zero/p/17202424.html

(function() {
	if (!window.location.href.endsWith('myblog/')) 
		return
})()

const iconCanvas = document.createElement('div');
const iconEle = document.querySelector('[alt="my image"]');
iconCanvas.style.borderRadius = "50%";
iconCanvas.style.overflow = "hidden";
iconCanvas.style.position = "absolute";
iconCanvas.style.top = `${iconEle.offsetTop}px`;
iconCanvas.style.left = `${iconEle.offsetLeft}px`;
iconCanvas.style.width = `${iconEle.offsetWidth}px`;
iconCanvas.style.height = `${iconEle.offsetHeight}px`;
iconEle.parentNode.appendChild(iconCanvas);

function updateOverlayPosition() {
	console.log(1);
    iconCanvas.style.top = `${iconEle.offsetTop}px`;
    iconCanvas.style.left = `${iconEle.offsetLeft}px`;
  }
  
updateOverlayPosition();
window.addEventListener('resize', updateOverlayPosition);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    90,
    1,
    0.1,
    1000
);

camera.position.set(0, 0, 60);
let renderer = new THREE.WebGLRenderer({ color: 'white' });
renderer.setSize(120, 120);
iconCanvas.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('static/icons/icon.jpg'); 
const dapthTexture = textureLoader.load('static/icons/icon-depth-map.jpg'); 

const mouse = new THREE.Vector2();
const geometry = new THREE.PlaneGeometry(120, 120);

const material = new THREE.ShaderMaterial({
	uniforms: {
		uTexture: {
			value: texture
		},
		uDepthTexture: {
			value: dapthTexture
		},
		uMouse: {
			value: mouse
		},
	},

	vertexShader: `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}`,

	fragmentShader: `
		uniform sampler2D uTexture;
		uniform sampler2D uDepthTexture;
		uniform vec2 uMouse;
		varying vec2 vUv;
		void main() {
			vec4 color = texture2D(uTexture, vUv);
			vec4 depth = texture2D(uDepthTexture, vUv);
			float depthValue = depth.r;
			float x = vUv.x + uMouse.x * 0.01 * depthValue;
			float y = vUv.y + uMouse.y * 0.01 * depthValue;
			vec4 newColor = texture2D(uTexture, vec2(x, y));
			gl_FragColor = newColor;
		}`,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

requestAnimationFrame(function animate() {
	material.uniforms.uMouse.value = mouse;
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
});

window.addEventListener('mousemove', (event) => {
	mouse.x = 1 - (event.clientX / window.innerWidth) * 15;
	mouse.y = (event.clientY / window.innerHeight) * 15 - 1;
})