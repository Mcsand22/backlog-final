export class ModoOscuroService {
  modoOscuro = false; // variable para guardar el estado actual del modo oscuro

  // método para obtener el estado actual del modo oscuro
  getModoOscuro() {
    return this.modoOscuro;
  }

  // método para cambiar el estado actual del modo oscuro
  toggleModoOscuro() {
    this.modoOscuro = !this.modoOscuro; // cambia el valor de la variable a su opuesto (true a
    // false, false a true)
  }
}
