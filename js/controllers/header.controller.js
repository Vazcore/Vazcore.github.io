export default {
  updateHeader(data) {
    const headerMeta = document.querySelector("#header_meta");    
    headerMeta.innerHTML = `
    <h3 class="primary">
      ${data.size} news are presented
    </h3>
    `;
  }
}