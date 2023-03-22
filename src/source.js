const vSource = `
    attribute vec4 a_position;
    attribute vec4 a_color;

    uniform mat4 u_matrix;
    uniform mat4 u_projection;
    uniform mat4 u_view;

    varying vec4 v_color;

    void main() {
    // Multiply the position by the matrix.
    gl_Position = u_projection * u_matrix * a_position;

    // Pass the color to the fragment shader.
    v_color = a_color;
    }
`;

const fSource = `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;

    void main() {
       gl_FragColor = v_color;
    }
`;

export { vSource, fSource };
