export const formatValidationErrors = (errors) => {
    return errors.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
    }));

}

export const numberToAmount = (number) => {
    const formatted = new Intl.NumberFormat('MX', {
       style: "currency",
       currency: "MXN",
       maximumFractionDigits: 2,
       minimumFractionDigits: 2
    })
    return formatted.format(number)
}

export const generarUsername = (nombre) => {
    /// Quitar acentos y caracteres especiales
    nombre = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Obtener la primera palabra
    let primeraPalabra = nombre.split(" ")[0];
    
    // Convertir a minúsculas
    primeraPalabra = primeraPalabra.toLowerCase();
    
    // Verificar si el nombre es más largo que 13 caracteres
    if (primeraPalabra.length > 13) {
        // Limitar el nombre a los primeros 13 caracteres
        primeraPalabra = primeraPalabra.slice(0, 13);
    }
    
    // Generar un número aleatorio de 6 dígitos
    const numeroAleatorio = Math.floor(Math.random() * 900000 + 100000);
    
    // Concatenar el nombre y el número aleatorio
    let username = primeraPalabra + numeroAleatorio;
    
    // Limitar la longitud total a 20 caracteres
    username = username.slice(0, 20);
    
    return username;
}