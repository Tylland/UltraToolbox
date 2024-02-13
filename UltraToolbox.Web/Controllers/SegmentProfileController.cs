//using Microsoft.AspNetCore.Mvc;
//using Trafikverket.CDAS.Persistence;
//using Trafikverket.CDAS.Persistence.Entities;
//using Trafikverket.CDAS.Persistence.Extensions;
//using Trafikverket.CDAS.Schemas.SFERA_v2_00;
//using static System.Net.Mime.MediaTypeNames;
//using Trafikverket.CDAS.Schemas.STEGAktuellPlan;

//namespace Trafikverket.CDAS.SegmentAdministration.Web.Controllers
//{
////    [Route("[controller]")]
//    [ApiController]
//    public class SegmentProfileController : ControllerBase
//    {
//        private readonly ISegmentProfileRepository _segmentProfileRepository;
//        private readonly IJourneyProfileRepository _journeyProfileRepository;
//        private readonly ILogger<SegmentProfileController> _logger;

//        public SegmentProfileController(ISegmentProfileRepository segmentProfileRepository/*, IJourneyProfileRepository journeyProfileRepository*/, ILogger<SegmentProfileController> logger)
//        {
//            _segmentProfileRepository = segmentProfileRepository ?? throw new ArgumentNullException(nameof(segmentProfileRepository));
//            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
//        }

//        //private voidasdad()
//        //{
//        //    _journeyProfileRepository.GetByTrainId()
//        //    TrainIdentifications = _journeyProfileRepository.GetByStartDate(DateTime.Today).ToDictionary(tid => $"tid{index++}", tid => tid.ToTrainIdentification());
//        //}


//        private SegmentProfileFeature CreateFeature(SegmentProfileEntity segment)
//        {
//            var payload = segment.GetPayload();

//            var positions = payload.SP_Points.VirtualBalise.Select(vb =>
//                new GeoLocation(vb.VirtualBalisePosition.Latitude, vb.VirtualBalisePosition.Longitude));

//            var coordinates = payload.SP_Points.VirtualBalise.Select(vb => new[]{ (double)vb.VirtualBalisePosition.Longitude, (double)vb.VirtualBalisePosition.Latitude});

//            return new SegmentProfileFeature(segment, coordinates.ToArray());
//        }

//        [HttpGet]
//        [Route("api/v1/segments/features/all")]
//        public SegmentProfileFeature[] GetAllFeatures()
//        {
//            var profiles = _segmentProfileRepository.GetAllLatest();

//            return profiles.Select(CreateFeature).ToArray();
//        }

//        [HttpGet]
//        [Route("api/v1/segment/{id}")]
//        public SegmentProfile? GetSegment([FromQuery] string id)
//        {
//            return _segmentProfileRepository.GetLatest(id);
//        }

//        [HttpGet]
//        [Route("api/v1/segments/{ids}")]
//        public SegmentProfile[] GetSegments([FromRoute] string ids)
//        {
//            var segments = new List<SegmentProfile>();

//            var segmentIds = ids.Split(',');

//            foreach (var segmentId in segmentIds)
//            {
//                var profile = _segmentProfileRepository.GetLatest(segmentId);
//                segments.Add(profile);
//            }

//            return segments.ToArray();
//        }

//        [HttpGet]
//        [Route("api/v1/journey/{id}")]
//        public SegmentProfile? GetJourneyProfile([FromQuery] string id)
//        {
//            return _segmentProfileRepository.GetLatest(id);
//        }

//    }
//}
