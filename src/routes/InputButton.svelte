<script>
  let { buttonName, inputs, setButtonState, ...props } = $props();
</script>

<button {...props} 
  onmousedown={setButtonState([buttonName], true)}
  onmouseup={setButtonState([buttonName], false)}
></button>