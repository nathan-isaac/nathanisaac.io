<template>
    <canvas width="440" height="640" ref="canvas" style="opacity: 0.5"></canvas>
</template>

<script>
    export default {
        data() {
            return {
                canvas: null,
                ctx: null,
                particles: [],
                numberOfParticles: 100,
            }
        },
        mounted() {
            this.initializeCanvas();
            this.resetCanvasSize(window.innerWidth, window.innerHeight);
            this.buildParticles();
            setTimeout(this.buildCanvas, 500);
        },
        methods: {
            initializeCanvas() {
                this.canvas = this.$refs.canvas;
                this.ctx = this.canvas.getContext('2d');
                this.ctx.scale(2,2);
            },
            buildParticles() {
                this.particles = _.map(_.range(this.numberOfParticles), particle => {
                    return {
                        position: {
                            x: _.random(0,this.canvas.width),
                            y: _.random(0,this.canvas.height)
                        },
                        velocity: {
                            x: _.random(-2,2),
                            y: _.random(-2,2)
                        },
                        radius: _.random(2,10),
                        color: `rgba(139, 195, 74, 0.5)`
                    };
                });
            },
            resetCanvasSize(width, height) {
                this.ctx.canvas.width = width * 2;
                this.ctx.canvas.height = height * 2;
                this.ctx.canvas.style.width = `${width}px`;
                this.ctx.canvas.style.height = `${height}px`;
            },
            distance(x1, y1, x2, y2) {
                let distanceSquared = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
                return Math.sqrt(distanceSquared);
            },
            drawLines(particleA) {
                _.forEach(this.particles, particleB => {
                    let distance = this.distance(particleA.position.x, particleA.position.y, particleB.position.x, particleB.position.y);
                    this.drawLine(particleA.position.x, particleA.position.y, particleB.position.x, particleB.position.y, distance);
                });
            },
            drawLine(x1, y1, x2, y2, distance) {
                let opacity = 0;
                let maxDistance = 400;
                let minDistance = 1;
                if (distance === 0) {
                    opacity = 1;
                } else if ( distance <= maxDistance - 1 ) {
                    opacity = 1 - _.round((distance - minDistance) / (maxDistance - minDistance), 2);
                }
                opacity = opacity - 0.4;
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.lineWidth = 1;
                this.ctx.closePath();
                this.ctx.strokeStyle = `rgba(139, 195, 74, ${opacity})`;
                this.ctx.stroke();
            },
            drawParticle(particle) {
                this.ctx.beginPath();
                this.ctx.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fillStyle = `rgba(139, 195, 74, 0.5)`;
                this.ctx.fill();
            },
            buildCanvas() {
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                _.forEach(this.particles, particle => {
                    this.drawParticle(particle);
                    this.drawLines(particle);
                    particle.position.x += particle.velocity.x;
                    particle.position.y += particle.velocity.y;
                    if (particle.position.y + particle.velocity.y > this.canvas.height || particle.position.y + particle.velocity.y < 0) {
                        particle.velocity.y = - particle.velocity.y;
                    }
                    if (particle.position.x + particle.velocity.x > this.canvas.width || particle.position.x + particle.velocity.x < 0) {
                        particle.velocity.x = - particle.velocity.x;
                    }
                });
            },
            animateCanvas(time) {
                this.buildCanvas();
                window.requestAnimationFrame(this.animateCanvas);
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/sass">
    canvas
        width: 100%
        height: 100vh
        position: absolute
        top: 0
        left: 0
        z-index: -100
</style>