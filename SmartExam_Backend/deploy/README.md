Deployment notes
----------------

1. Copy `gunicorn.service` to `/etc/systemd/system/gunicorn.service` and edit paths/user as needed.
2. Copy `nginx.conf` to `/etc/nginx/sites-available/smartexam` then symlink to `sites-enabled` and update `server_name`.
3. Ensure `venv` is created and dependencies installed: `python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`.
4. Run migrations and collectstatic before starting services:
   ```bash
   source venv/bin/activate
   python manage.py migrate
   python manage.py collectstatic --noinput
   sudo systemctl daemon-reload
   sudo systemctl enable --now gunicorn
   sudo systemctl restart nginx
   ```
