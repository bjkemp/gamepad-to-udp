<script>
  import { onMount, onDestroy } from 'svelte';
  import 'joypad.js';

  const buttonClasses = $state({
    Up: 'col-span-3 w-4 h-2 mt-1 bg-gray-400 rounded-full',
    Down: 'col-span-3 w-4 h-2 mb-1 bg-gray-400 rounded-full',
    Left: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90',
    Right: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90',
    button_0: 'col-span-3 bg-green-500 rounded-full w-5 h-5',
    button_1: 'bg-red-500 rounded-full w-5 h-5',
    button_2: 'bg-blue-500 rounded-full w-5 h-5',
    button_3: 'col-span-3 rounded-full w-5 h-5 button-1 bg-yellow-500',
  })

  let gamepad = $state(null);
  let gamepadName = $state('');
  let gamepadConnected = $state(false);

  let port = $state(8080);
  let ip = $state('localhost')

  let inputs = $state({})
  let log = $state([])

  // let inputs = $state({
  //   leftStickX: {state: 0, class: '', type: 'integer'},
  //   leftStickY: {state: 0, class: '', type: 'integer'},
  //   rightStickX: {state: 0, class: '', type: 'integer'},
  //   rightStickY: {state: 0, class: '', type: 'integer'},
  //   dpadUp: {class: 'col-span-3 w-4 h-2 mt-1 bg-gray-400 rounded-full', state: false, type: 'binary'},
  //   dpadDown: {class: 'col-span-3 w-4 h-2 mb-1 bg-gray-400 rounded-full', state: false, type: 'binary'},
  //   dpadLeft: {class: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90', state: false, type: 'binary'},
  //   dpadRight: {class: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90', state: false, type: 'binary'},
  //   button1: {class: 'col-span-3 rounded-full w-5 h-5 button-1 bg-yellow-500', state: false, type: 'binary'},
  //   button2: {class: 'bg-green-500 rounded-full w-5 h-5', state: false, type: 'binary'},
  //   button3: {class: 'bg-red-500 rounded-full w-5 h-5', state: false, type: 'binary'},
  //   button4: {class: 'col-span-3 bg-blue-500 rounded-full w-5 h-5', state: false, type: 'binary'},
  //   triggerLeft: {state: 0, class: '', type: 'integer'},
  //   triggerRight: {state: 0, class: '', type: 'integer'},
  //   bumperLeft: {state: false, class: '', type: 'binary'},
  //   bumperRight: {state: false, class: '', type: 'binary'},
  //   xboxButton: {state: false, class: '', type: 'binary'}
  // })

  const setButtonState = (button, state) => {
    if (!inputs[button]) return;

    inputs[button].pressed = state;

    if (state)
      inputs[button].value = 1
    else
      inputs[button].value = 0

    // inputs[button].class = state ? `${inputs[button].class} ring` : inputs[button].class.replace(' ring', '');
  }

  joypad.on('connect', (e) => {
    console.log('Gamepad connected: ', e.gamepad.id);
    gamepad = e.gamepad;
    gamepadConnected = true;
    gamepadName = gamepad.id;

    // Populate inputs with gamepad buttons
    gamepad.buttons.forEach((button, i) => {
      inputs[`button_${i}`] = {pressed: button.pressed, value: button.value};
      
    });

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

    buttonPressHandler(buttonName, e.detail.button.pressed, e.detail.button.value)

  });

  joypad.on('button_release', (e) => {
    const buttonName = e.detail.buttonName;
    if (!buttonName) return;
    if (!inputs[buttonName]) return;

    buttonReleaseHandler(buttonName)
  });

  function buttonPressHandler(b, pressed, value) {
    if (!inputs) return;

    inputs[b].pressed = pressed;
    inputs[b].value = value;

    if (!buttonClasses[b]?.includes('ring'))
      buttonClasses[b] = `${buttonClasses[b]} ring`;
  }

  function buttonReleaseHandler(b) {
    if (!inputs[b]) return;

    inputs[b].pressed = false;
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

    // Read the value of the analog triggers
    const leftTriggerValue = gamepad.buttons[6].value;
    const rightTriggerValue = gamepad.buttons[7].value;

    // Update the inputs object
    inputs = {
      ...inputs,
      button_6: {value: leftTriggerValue, pressed: leftTriggerValue > 0.00001},
      button_7: {value: rightTriggerValue, pressed: rightTriggerValue > 0.00001},
    };
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
          <th>Pressed</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.keys(inputs) as input}
          <tr>
            <td>{input}</td>
            <td>{inputs[input]?.pressed}</td>
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
          <button class="{buttonClasses[`button_${b}`]}" onmousedown={() => buttonPressHandler(`button_${b}`, true, 1)} onmouseup={() => buttonReleaseHandler(`button_${b}`)} onmouseleave={() => buttonReleaseHandler(`button_${b}`)}></button>
          {#if b === '2'}
            <div class="w-4 h-4"></div>
          {/if}
        {/each}
      </div>
    
      <!-- D-Pad -->
      <div class="grid grid-cols-3 absolute top-24 left-26 w-10 h-10 bg-gray-600 rounded-full justify-items-center z-10">  
        {#each ['Up', 'Left', 'Right', 'Down'] as b }
          <button class="{buttonClasses[b]}" onmousedown={() => setButtonState(`button${b}`, true)} onmouseup={() => setButtonState(`dpad${b}`, false)}  onmouseleave={() => setButtonState(`dpad${b}`, false)}></button>
          {#if b === 'Left'}
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
    
    {#if gamepadConnected}
      <h3>{gamepadName}</h3>
    {:else}
      <h3>Connect your gamepad and press a button to begin.</h3>
    {/if}

    <div class="flex gap-2">

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
  </div>
</div>


