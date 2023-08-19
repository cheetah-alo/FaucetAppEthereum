## Problemas con la Implementación de la App para Faucet

Estoy enfrentando varios desafíos al desarrollar una aplicación para un faucet en Ethereum. A continuación, detallo los problemas que he encontrado, con la esperanza de obtener alguna orientación o solución:

### 1. Problema al Inicializar el Nodo

Al intentar inicializar el nodo, recibo el siguiente error: `zsh:command not found`. Este error se presenta específicamente cuando intento usar el comando `--mine`. He buscado soluciones en línea, pero no he encontrado nada que se relacione específicamente con este comando.

**Imagen del error:** (Aquí puedes insertar la imagen o enlace a la misma)

### 2. Inconsistencia en el Saldo en MetaMask

A pesar de que he agregado la red a MetaMask, no se muestra el saldo. Sin embargo, al ejecutar `npx nodemon` en la terminal, sí puedo ver el saldo de la wallet. ¿Podría esto estar relacionado con el nodo que no se levanta correctamente?

### 3. Problemas con el Saldo en el Frontend

En el frontend, la aplicación detecta y responde cuando me conecto a MetaMask y también refleja los cambios cuando cambio de cuentas. Sin embargo, el saldo siempre se muestra como cero. ¿Es posible que el saldo real sea un decimal (como 0,5 ETH) y por eso no se muestra?

---

Agradezco de antemano cualquier ayuda o sugerencia que puedan brindarme. ¡Gracias!