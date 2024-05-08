<script>
  import { onMount, onDestroy } from 'svelte';
  import 'joypad.js';

  let gamepad = $state(null);
  let gamepadName = $state('Press a button to continue...');
  let coin_inserted = $state(false);

  let port = $state(8080);
  let ip = $state('localhost');
  let interval = 100;

  let inputs = $state({
    axis_0: {value: 0, label: 'Left Stick Horizontal'},
    axis_1: {value: 0, label: 'Left Stick Vertical'},
    axis_2: {value: 0, label: 'Right Stick Horizontal'},
    axis_3: {value: 0, label: 'Right Stick Vertical'}, 

    button_0: {value: 0, label: 'Right Cluster Bottom', class: 'col-span-3 bg-green-500 rounded-full w-5 h-5'},
    button_1: {value: 0, label: 'Right Cluster Right', class: 'bg-red-500 rounded-full w-5 h-5'},
    button_2: {value: 0, label: 'Right Cluster Left', class: 'bg-blue-500 rounded-full w-5 h-5'},
    button_3: {value: 0, label: 'Right Cluster Top', class: 'col-span-3 rounded-full w-5 h-5 button-1 bg-yellow-500'},
    button_4: {value: 0, label: 'Shoulder Button Left', class: ''},
    button_5: {value: 0, label: 'Shoulder Button Right', class: ''},
    button_6: {value: 0, label: 'Left Trigger', class: ''},
    button_7: {value: 0, label: 'Right Trigger', class: ''},
    button_8: {value: 0, label: 'Center Cluster Left', class: ''},
    button_9: {value: 0, label: 'Center Cluster Right', class: ''},
    button_10: {value: 0, label: 'Left Stick Press', class: ''},
    button_11: {value: 0, label: 'Right Stick Press', class: ''},
    button_12: {value: 0, label: 'Left Cluster Top', class: 'col-span-3 w-4 h-2 mt-1 bg-gray-400 rounded-full'},
    button_13: {value: 0, label: 'Left Cluster Bottom', class: 'col-span-3 w-4 h-2 mb-1 bg-gray-400 rounded-full'},
    button_14: {value: 0, label: 'Left Cluster Left', class: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90'},
    button_15: {value: 0, label: 'Left Cluster Right', class: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90'},
    button_16: {value: 0, label: 'Vendor Button 1', class: ''},
    button_17: {value: 0, label: 'Vendor Button 2', class: ''},
  })

  let log = $state([])

  joypad.on('connect', (e) => {
    console.log('Gamepad connected: ', e.gamepad.id);
    gamepad = e.gamepad;
    gamepadConnected = true;
    gamepadName = gamepad.id;

    coin_inserted = true;
  });

  joypad.on('disconnect', (e) => {
    console.log('Gamepad disconnected: ', e.gamepad.id);
    gamepadConnected = false;
    gamepadName = '';
  });

  // Update button states on any gamepad change
  joypad.on('button_press', (e) => {
    const buttonName = e.detail.buttonName;
    if (!buttonName) return;
    if (!inputs[buttonName]) return;

    buttonPressHandler(buttonName, e.detail.button.value)

  });

  joypad.on('button_release', (e) => {
    const buttonName = e.detail.buttonName;
    if (!buttonName) return;
    if (!inputs[buttonName]) return;

    buttonReleaseHandler(buttonName)
  });

  function buttonPressHandler(b, value) {
    if (!inputs) return;

    if (!coin_inserted) coin_inserted = true;

    inputs[b].value = value;

    if (!buttonClasses[b]?.includes('ring'))
      buttonClasses[b] = `${buttonClasses[b]} ring`;
  }

  function buttonReleaseHandler(b) {
    if (!inputs[b]) return;

    inputs[b].value = 0;

    if (buttonClasses[b]?.includes('ring'))
      buttonClasses[b] = buttonClasses[b].replace('ring', '');
  }

  // Update the gamepad state every frame
  function updateGamepadState() {
    if (!navigator.getGamepads) return;
    const gamepads = navigator.getGamepads();
    if (!gamepads) return;
    const gamepad = gamepads[0]; // Use the first gamepad
    if (!gamepad) return;

    // Get gamepad state
    const this_state = {}

    // Read the value of all axes
    for (let i = 0; i < gamepad.axes.length; i++) {
      let this_value = gamepad.axes[i];

      // Normalize the value of the axis for Arduino (0-255)
      this_value = Math.round((this_value + 1) * 127.5);
      this_state[`axis_${i}`] = {value: this_value, label: inputs[`axis_${i}`]?.label, class: inputs[`axis_${i}`].class};
    }

    // Read the value of all buttons
    for (let i = 0; i < gamepad.buttons.length; i++) {
      let this_value = gamepad.buttons[i].value;

      // Normalize the value of the button for Arduino (0-255)
      this_value = Math.round(this_value * 255);
      this_state[`button_${i}`] = {value: this_value, label: inputs[`button_${i}`]?.label, class: inputs[`button_${i}`].class};
    }

    // Update the inputs object
    inputs = {...this_state};
  }

  // Send current state
  function sendUDP() {
    
  }

  // Call updateGamepadState every frame
  let animationFrameId;
  onMount(() => {
    animationFrameId = requestAnimationFrame(function update() {
      updateGamepadState();
      animationFrameId = requestAnimationFrame(update);
    });
  });

  onDestroy(() => {
    cancelAnimationFrame(animationFrameId);
  });
</script>

<div class="grid grid-cols-3 gap-10">
  <div class="text-center">
    <h2>Inputs</h2>
    <!-- Controller Input Table -->
    <table class="table-auto mt-4 w-100">
      <thead>
        <tr>
          <th>Input</th>
          <th>Label</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.keys(inputs) as input}
          <tr>
            <td>{input}</td>
            <td>{inputs[input]?.label}</td>
            <td>{inputs[input]?.value}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="">
    <div class="w-80 h-40 bg-gray-900 rounded-lg shadow-lg relative">
      <!-- Body -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-4/5 bg-gray-800 rounded-lg"></div>
    
      <!-- Grips -->
      <div class="absolute top-2 left-2 w-16 h-36 bg-gray-700 rounded-l-lg z-0"></div>
      <div class="absolute top-2 right-2 w-16 h-36 bg-gray-700 rounded-r-lg z-0"></div>
    
      <!-- Left Stick -->
      <div class="absolute top-14 left-1/5 w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center z-10">
        <div class="w-4 h-4 bg-gray-400 rounded-full"></div> 
      </div>
    
        <!-- ABXY Buttons -->  
      <div class="grid grid-cols-3 absolute top-14 right-12 justify-items-center z-10">  
        {#each ['3', '2', '1', '0'] as b }
          <button class="{inputs[`button_${b}`].class}" onmousedown={() => buttonPressHandler(`button_${b}`, 255)} onmouseup={() => buttonReleaseHandler(`button_${b}`)} onmouseleave={() => buttonReleaseHandler(`button_${b}`)}></button>
          {#if b === '2'}
            <div class="w-4 h-4"></div>
          {/if}
        {/each}
      </div>
    
      <!-- D-Pad -->
      <div class="grid grid-cols-3 absolute top-24 left-26 w-10 h-10 bg-gray-600 rounded-full justify-items-center z-10">  
        {#each ['12', '14', '15', '13'] as b }
          <button class="{inputs[`button_${b}`].class}" onmousedown={() => buttonPressHandler(`button_${b}`, 255)} onmouseup={() => buttonReleaseHandler(`button_${b}`)}  onmouseleave={() => buttonReleaseHandler(`button_${b}`)}></button>
          {#if b === '14'}
            <div class="w-2 h-4"></div>
          {/if}
        {/each}
      </div>
    
      <!-- Right Stick -->
      <div class="absolute top-24 right-26 w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center z-10">
        <div class="w-4 h-4 bg-gray-400 rounded-full"></div> 
      </div>
    
      <!-- Xbox Button -->
      <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-400 rounded-full flex justify-center items-center z-10">
        <div class="w-3 h-3 bg-gray-900 rounded-full"></div>
      </div>
    
    
      <!-- Triggers -->
      <div class="absolute top-12 inset-x-4 flex justify-between z-5">
        <div class="w-6 h-12 bg-gray-500 rounded-lg"></div>
        <div class="w-6 h-12 bg-gray-500 rounded-lg"></div>
      </div>
    
      <!-- Bumpers -->
      <div class="absolute top-4 inset-x-4 flex justify-between z-5">
        <div class="w-12 h-6 bg-gray-500 rounded-lg z-1"></div>
        <div class="w-12 h-6 bg-gray-500 rounded-lg z-1"></div>
      </div>
    </div>

    <div class="flex gap-2 pt-4">
      <div class="flex items-center">
        <label for="ip" class="mr-1">IP:</label>
        <input type="text" id="ip" bind:value={ip} class="w-20 h-6">
      </div>
      <div class="flex items-center">
        <label for="port" class="mr-1">Port:</label>
        <input type="number" id="port" bind:value={port} class="w-20 h-6">
      </div>
    </div>
  </div>

  <div class="text-center">
    <h3>Log</h3>
    {#if !coin_inserted}
      <h3>Press a button to continue...</h3>
    {/if}
  </div>
</div>
