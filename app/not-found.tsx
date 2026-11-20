import ThumbnailNav from "@/components/thumbnail-nav/thumbnail-nav";


export default function NotFound() {
  return (
    <div className="two-column-page-container">
      <div className="two-column-page-grid">
        <div className="col-1 flex flex-1 self-stretch w-full items-center justify-center">
          <h2>Not found here...</h2>
        </div>
        <div className="two-column-page-navigation-column">
          <ThumbnailNav />
        </div>
      </div>
    </div>
  )
}