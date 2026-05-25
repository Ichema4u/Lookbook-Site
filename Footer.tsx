export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container text-center text-sm text-slate-600">
        <div>
          Made with ♥ by The Lookbook creator — © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
