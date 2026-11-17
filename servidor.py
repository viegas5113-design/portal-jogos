#!/usr/bin/env python3
"""
Servidor local de testes para Portal de Jogos (PWA) na porta 8110.
"""

import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

DIR_WEB = Path(__file__).resolve().parent
PORTA = 8110


class ManipuladorPortal(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIR_WEB), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(DIR_WEB)
    servidor = HTTPServer(("0.0.0.0", PORTA), ManipuladorPortal)
    print(f"[*] Portal de Jogos ativo em http://127.0.0.1:{PORTA}")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Servidor terminado.")
        sys.exit(0)
