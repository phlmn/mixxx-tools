const controller_preset = (name, controls) => `
<?xml version='1.0' encoding='utf-8'?>
<MixxxControllerPreset mixxxVersion="" schemaVersion="1">
    <info>
        <name>${name}</name>
    </info>
    <controller id="">
        <scriptfiles/>
        <controls>
            ${controls}
        </controls>
        <outputs/>
    </controller>
</MixxxControllerPreset>
`;

let sampler_control = (sampler_no, midi_no) => `
            <control>
                <group>[Sampler${sampler_no}]</group>
                <key>cue_gotoandplay</key>
                <description>Sampler ${sampler_no}</description>
                <status>0x90</status>
                <midino>${midi_no}</midino>
                <options>
                    <normal/>
                </options>
            </control>
`;

const to_hex = (num) => "0x" + ("00" + num).toString(16).slice(-2);

const control_entries = new Array(8)
  .fill()
  .map((_, row) =>
    new Array(8)
      .fill()
      .map((_, i) => sampler_control(row * 8 + i + 1, to_hex(row * 16 + i)))
      .join("\n")
  )
  .join("\n");

console.log(controller_preset("Launchpad Sampler", control_entries));
