using System;
using System.Collections.Generic;

namespace Backend.API.Models;

public partial class MusicalPreference
{
    public int? CustomerId { get; set; }

    public int? StyleId { get; set; }

    public int? PreferenceSeq { get; set; }
}
